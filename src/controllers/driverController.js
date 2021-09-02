const { response, request } = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Driver = require('../models/driver')
const driverCtrl = {};


driverCtrl.get = async (req, res ) => {
    const drivers = await Driver.findAll({
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
    const drivers = await Driver.findAll({
        where: {
            identification: {
                [Op.like]: `%${req.query.documentId}%`
        }
    }});
    res.json(drivers);
}

driverCtrl.post = async ( req, res ) => {
    const { name,phone,type,placa_vehicle,email,documentId } = req.body;
    const DriverCreate = await Driver.create({ 
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