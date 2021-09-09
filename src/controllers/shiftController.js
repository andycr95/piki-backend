const moment = require('moment')
moment.locale('es');
const db = require('../models');
const Driver = require('../models/driver');
const { Op, QueryTypes, DatabaseError } = require("sequelize");
const { CampoMock } = require('../mocks/campos.mock');
const shiftCtrl = {};

shiftCtrl.get = async (req, res ) => {
    const shifts = await db.shift.findAll();
    res.json(shifts);
}

shiftCtrl.getShift = async (req, res ) => {
    const shift = await db.shift.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {model: db.client, as: 'client' }, 
            {model: db.transLine, as: 'transLine' },
            {model: db.user, as: 'user' },
            {model: db.shiftClass, as: 'shiftClass' },
            {model: db.containerYard, as: 'containerYard' },
            {model: db.container, as: 'containers', include:{
                model: db.containerType, as: 'containerType' 
            } },
           { model: db.driver, as: 'driver'}
        ]
    });
    res.json(shift);
}

shiftCtrl.post = async ( req, res ) => {
    const { document,type,transportLine,clientId,limitTime,patio, containers, observations } = req.body;
    let dateLimit = new Date(limitTime)
    const classShift = await db.shiftClass.findOne({
        where:{
           id : type
        }
    });
    const driver = await db.driver.findOne({
        where:{
           identification : document
        }
    });
    const compare = await compareDate();
    const ShiftCreate = await db.shift.create({ 
        limitDate: dateLimit,
        clientId: parseInt(clientId),
        driverId: driver.id,
        transLineId: parseInt(transportLine),
        userId: 1,
        shiftClassId: parseInt(type),
        containerYardId: parseInt(patio),
        price: parseInt(classShift.price),
        dayShift:  compare.compare ? compare.shiftL.dayShift+1 : 1,
        globalShift: compare.compare ? compare.shiftL.globalShift+1 : 1,
        obvs: observations,
        status: 'true'
    });

    await createContainer(containers, ShiftCreate.id);
    const shift = await db.shift.findOne({
        where: {
            id: ShiftCreate.id,
        },
        include: [
            {model: db.client, as: 'client' }, 
            {model: db.transLine, as: 'transLine' },
            {model: db.user, as: 'user' },
            {model: db.shiftClass, as: 'shiftClass' },
            {model: db.containerYard, as: 'containerYard' },
            {model: db.container, as: 'containers', include:{
                model: db.containerType, as: 'containerType' 
            } },
           { model: db.driver, as: 'driver'}
        ]
    });

    res.json({
        msg: 'post API - lastShift',
        shift
    });
}

async function compareDate() {
    const lastShift = await db.shift.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });


    if (lastShift.length === 0) return false;
    let shiftL = lastShift[0];
    let now = new Date();
    let date = moment(now).format("YYYY-MM-DD");
    let dateN = moment(shiftL.createdAt).format("YYYY-MM-DD");

    return {
        compare: date == dateN,
        shiftL
    };
}


async function createContainer(containers, id) {
    for (let i = 0; i < containers.length; i++) {
        const c = containers[i];
        const type = await db.containerType.findOne({
            where: {
                code: c.typeCode,
                status: 'true'
            }
        });
        await db.container.create({ 
            code:c.container,
            containerTypeId:type.id, 
            shiftId:id,
            status: 'true'
        });        
    }
}

shiftCtrl.getFilter = async ( req, res ) => {
    try {
        const { campos, cliente, patio, linea, clase, tipoTamanioContenedor, fechaIni, fechaFin  } = req.body;
        let attributes = []
        let filter = []
        let where = ""

        campos.forEach( ( data ) => {
            attributes.push(CampoMock[data])
        })

        if (cliente.length) filter.push(`clients.id=${cliente[0].item_id}`)
        if (patio.length) filter.push(`containerYards.id=${patio[0].item_id}`)
        if (linea.length) filter.push(`transLines.id=${linea[0].item_id}`)
        if (clase.length) filter.push(`shiftClasses.id=${clase[0].item_id}`)
        if (fechaFin && fechaIni) filter.push(`shifts.createdAt BETWEEN '${moment(fechaIni).format('YYYY-MM-DD HH:mm:ss')}' AND '${ moment(fechaFin).add(24, 'hours').format('YYYY-MM-DD HH:mm:ss') }'`)

        if (filter.length) where = `WHERE ${filter.join(' AND ')}`;

        const turnos = await db.sequelize.query(`SELECT ${attributes.toString()} FROM shifts JOIN clients ON clients.id = shifts.clientId JOIN drivers ON drivers.id=shifts.driverId JOIN transLines ON transLines.id=shifts.transLineId JOIN containerYards ON containerYards.id=shifts.containerYardId JOIN shiftClasses ON shiftClasses.id=shifts.shiftClassId ${where}`, { type: QueryTypes.SELECT})

        /* const query = {
            order: [
                ['limitDate', 'ASC']
            ],
            include: [
                {
                    model: db.client,
                    attributes: ['name'],
                }
            ],
            attributes: attributes
        }

        const turnos = await db.shift.findAll(query)*/

        res.json(turnos)
    } catch (error) {
        console.log('error: ', error);
    }
}

/* where: {
    createdAt: {
        [Op.gte]: moment(fechaIni).format('YYYY-MM-DD'),
        [Op.lte]: moment(fechaFin)
    }
} */

module.exports = shiftCtrl;