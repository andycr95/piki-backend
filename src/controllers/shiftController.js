const { response, request } = require('express');
const moment = require('moment');
moment.locale('es');
const Shift = require('../models/shiftModel');
const Driver = require('../models/driverModel');
const ClassShift = require('../models/classModel')
const shiftCtrl = {};


shiftCtrl.get = async (req, res ) => {
    const shifts = await Shift.findAll();
    res.json(shifts);
}

shiftCtrl.getShift = async (req, res ) => {
    const shift = await Shift.findOne({
        where: {
            id: req.params.id,
        },
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
    const ShiftCreate = await Shift.create({ 
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
    const lastShift = await Shift.findOne({
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

module.exports = shiftCtrl;