const moment = require('moment').locale('es');
const db = require('../models');
const Driver = require('../models/driver');
const { Op } = require("sequelize");
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

shiftCtrl.getDataFilter = async ( req, res ) => {
    try {
        const patios = await db.containerYard.findAll({
            attributes: [['id', 'item_id'], ['description', 'item_text']],
            order: [
                ['description', 'ASC']
            ]
        })

        const tiposTamanios = await db.containerType.findAll({
            attributes: ['id', 'description'],
            order: [
                ['description', 'ASC']
            ]
        })

    } catch (error) {
        res.json({ error: error})                
    }
}

shiftCtrl.getFilter = async ( req, res ) => {
    const { campos, fechaIni, fechaFin } = req.body;
    const query = {
        order: [
            ['id', 'ASC']
        ],
        attributes: ['dayShift', 'globalShift'],       
    }
    const turnos = await db.shift.findAll(query)

    res.json(turnos)
}

/* where: {
    createdAt: {
        [Op.gte]: moment(fechaIni).format('YYYY-MM-DD'),
        [Op.lte]: moment(fechaFin)
    }
} */

module.exports = shiftCtrl;