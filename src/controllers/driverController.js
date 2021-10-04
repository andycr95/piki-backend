const { response, request } = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const driverCtrl = {};


driverCtrl.get = async (req, res ) => {
    const drivers = await db.driver.findAll({
        where: {
            status: 'true'
        },
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
    let type = req.query.type == 1 || req.query.type == 3 || req.query.type == 4 ? 1 : 2;
    const drivers = await db.driver.findAll({
        where: {
            [Op.and]: [
                {identification: {
                    [Op.like]: `%${req.query.documentId}%`
                }},
                {type: type}
            ]
        }
    });
    res.json(drivers);
}

driverCtrl.post = async ( req, res ) => {
    const { name,phone,type,vehicle_plate,email,identification } = req.body;
    const DriverCreate = await db.driver.create({ 
        identification,
        name, 
        email,
        phone, 
        vehicle_plate, 
        type,
        status: 'true'
    });

    res.json({
        message: 'post API - driversPost',
        DriverCreate
    });
}

driverCtrl.update = async ( req, res ) => {
    const { name,phone,type,placa_vehicle,email,documentId } = req.body;
    const driver = await db.driver.findOne({ 
        where: {
            id: req.params.id,
        },
    });
    driver.identification = documentId;
    driver.name = name;
    driver.email = email;
    driver.phone = phone; 
    driver.vehicle_plate = placa_vehicle; 
    driver.type = type;
    await driver.save();
    res.json({
        message: 'Conductor actualizado',
        driver
    });
}

driverCtrl.delete = async ( req, res ) => {
    const driver = await db.driver.findOne({ 
        where: {
            id: req.params.id,
        },
    });
    driver.status = 'false';
    await driver.save();
    res.json({
        message: 'Conductor eliminado',
        driver
    });
}

module.exports = driverCtrl; 