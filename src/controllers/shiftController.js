const moment = require('moment')
moment.locale('es');
const db = require('../models');
const Driver = require('../models/driver');
const { Op, QueryTypes, DatabaseError } = require("sequelize");
const { CamposMock, CamposWhereMock } = require('../mocks/campos.mock');
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
    const shift = await db.shift.findByPk(ShiftCreate.id, { 
        include: [
            {model:"client"}, 
            {model:"driver"}, 
            {model:"transLine"}, 
            {model:"user"}, 
            {model:"shiftClass"}, 
            {model:"containerYard"},
            {model:"containers", include: ["container.containerType"] }
        ]
    })

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
        const { campos, fechaIni, fechaFin } = req.body;
        delete req.body.titulo
        delete req.body.campos
        delete req.body.fechaIni
        delete req.body.fechaFin
        let attributes = {};
        attributes['shifts'] = ['createdAt', 'price'];
        attributes['containers'] = ['id']
        let filter = {}

        for (const campo of campos) {
            const datos = CamposMock[campo];
            if (datos) {
                for (const value of datos) {
                    if (!attributes[value['table']]) attributes[value['table']] = []
                    attributes[value['table']].push(value['field'])
                }
            }
        }

        for (const key in req.body) {
            if (req.body[key] && req.body[key].length) {
                const campo = CamposWhereMock[key]
                if (!filter[campo['table']]) filter[campo['table']] = {}
                filter[campo['table']][campo['field']] = req.body[key][0].item_id                
            }
        }

        if (fechaIni) {
            if (!filter['shifts']) filter['shifts'] = {};
            filter['shifts']['createdAt'] = {
                [Op.gte]: moment(fechaIni).format('YYYY-MM-DD HH:mm:ss'),
                [Op.lte]: moment( (fechaFin) ? fechaFin : fechaIni).add(24, 'hours').format('YYYY-MM-DD HH:mm:ss')
            }
        } 

        const query = {
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: db.client,
                    attributes: (attributes['clients'] ) ? attributes['clients'] : []
                },
                {
                    model: db.container,
                    attributes: attributes['containers'],
                    where: filter['containers'],
                    include: {
                        model: db.containerType,
                        attributes: (attributes['containerTypes'] ) ? attributes['containerTypes'] : [],
                    }
                },
                {
                    model: db.driver,
                    attributes: (attributes['drivers'] ) ? attributes['drivers'] : [],
                },
                {
                    model: db.transLine,
                    attributes: (attributes['transLines'] ) ? attributes['transLines'] : [],
                },
                {
                    model: db.containerYard,
                    attributes: (attributes['containerYards'] ) ? attributes['containerYards'] : [],
                },
                {
                    model: db.shiftClass,
                    attributes: ['id', 'name' ]
                }

            ],
            attributes: attributes['shifts'],
            where: filter['shifts']
        }

        const turnos = await db.shift.findAll(query)

        res.status(200).json(turnos)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = shiftCtrl;