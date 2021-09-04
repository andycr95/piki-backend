const { response, request } = require('express');
const moment = require('moment');
moment.locale('es');
const shiftCtrl = {};
const db = require('../models');

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

module.exports = shiftCtrl;