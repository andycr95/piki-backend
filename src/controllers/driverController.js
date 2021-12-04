const { response, request } = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const driverCtrl = {};


driverCtrl.get = async (req, res ) => {
    try {
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
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

driverCtrl.search = async (req, res ) => {

    try {
        let type = req.query.type == 1 || req.query.type == 4 ? 1 : 2;
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
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

driverCtrl.post = async ( req, res ) => {
    const { name,phone,type,vehicle_plate,email,identification } = req.body;
    try {
        const DriverCreate = await db.driver.create({ 
            identification,
            name, 
            email,
            phone, 
            vehicle_plate, 
            type,
            status: 'true'
        });
    
        res.status(200).json({
            message: 'post API - driversPost',
            DriverCreate
        });
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

driverCtrl.update = async ( req, res ) => {
    const { name,phone,type,placa_vehicle,email,documentId } = req.body;
    try {
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
        res.status(200).json({
            message: 'Conductor actualizado',
            driver
        });
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

driverCtrl.delete = async ( req, res ) => {
    try {
        const driver = await db.driver.findOne({ 
            where: {
                id: req.params.id,
            },
        });
        driver.status = 'false';
        await driver.save();
        res.status(200).json({
            message: 'Conductor eliminado',
            driver
        });
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

module.exports = driverCtrl; 