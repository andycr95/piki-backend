const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Client = require('../models/clientModel')
const clientCtrl = {};


clientCtrl.get = async (req, res ) => {
    const clients = await Client.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    });
    for (let i = 0; i < clients.length; i++) {
        const c = clients[i];
        c.nombre = c.nombre.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
    res.json(clients);
}

clientCtrl.searchclient = async (req, res ) => {
    const clients = await Client.findAll({
        where: {
            cedula: {
                [Op.like]: `%${req.query.documentId}%`
        }
    }});
    res.json(clients);
}

clientCtrl.post = async ( req, res ) => {
    const { name,phone,place_vehicle,documentId } = req.body;
    const ClientCreate = await Client.create({ 
        cedula:documentId,
        nombre:name, 
        telefono:phone, 
        placa_vehiculo:place_vehicle, 
        status: 'true'
    });

    res.json({
        msg: 'post API - clientsPost',
        ClientCreate
    });
}

module.exports = clientCtrl;