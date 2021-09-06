const moment = require('moment').locale('es');
const db = require('../models');
const sequelize = require("sequelize");
const Driver = require('../models/driver');
const ClassShift = require('../models/shiftclass')
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
    const classShift = await ClassShift.findOne({
        where:{
           id : type
        }
    });
    const driver = await Driver.findOne({
        where:{
           identificacion : document
        }
    });
    const compare = await compareDate();
    const ShiftCreate = await db.shift.create({ 
        fecha_limite: limitTime,
        id_cliente: clientId,
        id_conductor: driver.id,
        id_linea: transportLine,
        id_usuario: 1,
        id_clase: type,
        id_patio: patio,
        precio: classShift.precio,
        consecutivo:  compare.compare ? compare.lastShift.consecutivo+1 : 1,
        turno_global: compare.lastShift.turno_global+1,
        observaciones: observations,
        status: 'true'
    });

    res.json({
        msg: 'post API - lastShift',
        ShiftCreate
    });
}

async function compareDate() {
    const lastShift = await db.shift.findOne({
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