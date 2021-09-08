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
        include: {
            model: Driver, as: 'driver'
        }
    });
    res.json(shift);
}

shiftCtrl.post = async ( req, res ) => {
    const { document,type,transportLine,clientId,limitTime,patio,observations } = req.body;
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
        limitDate: limitTime,
        clientId: clientId,
        driverId: driver.id,
        lineId: transportLine,
        userId: 1,
        classId: type,
        containerYardId: patio,
        price: classShift.precio,
        dayShift:  compare.compare ? compare.lastShift.consecutivo+1 : 1,
        globalShift: compare.lastShift.turno_global+1,
        obvs: observations,
        status: 'true'
    });

    res.json({
        msg: 'post API - lastShift',
        ShiftCreate
    });
}

async function compareDate() {
    const lastShift = await db.shift.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    });
    let now = new Date();
    let date = moment(now).format("YYYY-MM-DD");
    let dateN = moment(lastShift.createdAt).format("YYYY-MM-DD");

    return {
        compare: date == dateN,
        lastShift
    };
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