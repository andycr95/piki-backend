const { response, request } = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Driver = require('../models/driverModel')
const driverCtrl = {};


driverCtrl.get = async (req, res ) => {
    const drivers = await Driver.findAll({
        order: [
            ['descripcion', 'ASC']
        ]
    });
    for (let i = 0; i < drivers.length; i++) {
        const c = drivers[i];
        c.nombre = c.nombre.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
    res.json(drivers);
}

driverCtrl.search = async (req, res ) => {
    const drivers = await Driver.findAll({
        where: {
            identificacion: {
                [Op.like]: `%${req.query.documentId}%`
        }
    }});
    res.json(drivers);
}

driverCtrl.post = async ( req, res ) => {
    const { name,phone,type,placa_vehicle,email,documentId } = req.body;
    const DriverCreate = await Driver.create({ 
        identificacion:documentId,
        nombre:name, 
        correo:email,
        telefono:phone, 
        placa_vehiculo:placa_vehicle, 
        tipo: type,
        status: 'true'
    });

    res.json({
        msg: 'post API - driversPost',
        DriverCreate
    });
}

module.exports = driverCtrl;