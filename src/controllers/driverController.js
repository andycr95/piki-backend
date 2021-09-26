const { response, request } = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const driverCtrl = {};


driverCtrl.get = async (req, res ) => {
    const drivers = await db.driver.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
    for (let i = 0; i < drivers.length; i++) {
        const c = drivers[i];
        c.name = c.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
    res.json(drivers);
}

driverCtrl.search = async (req, res ) => {
    console.log(req.query);
    const drivers = await db.driver.findAll({
        where: {
            [Op.and]: [
                {identification: {
                    [Op.like]: `%${req.query.documentId}%`
                }},
                {type: req.query.type}
            ]
        }
    });
    res.json(drivers);
}

driverCtrl.post = async ( req, res ) => {
    const { name,phone,type,placa_vehicle,email,documentId } = req.body;
    const DriverCreate = await db.driver.create({ 
        identification:documentId,
        name:name, 
        email,
        phone, 
        vehicle_plate:placa_vehicle, 
        type,
        status: 'true'
    });

    res.json({
        msg: 'post API - driversPost',
        DriverCreate
    });
}

module.exports = driverCtrl;