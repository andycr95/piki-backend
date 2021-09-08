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

module.exports = shiftCtrl;