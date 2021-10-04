const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const clientCtrl = {};

clientCtrl.get = async (req, res ) => {
    const clients = await db.client.findAll({
        where: {
            status: 'true'
        },
        order: [
            ['name', 'ASC']
        ]
    });
    for (let i = 0; i < clients.length; i++) {
        const c = clients[i];
        if (c.name != null) {
            c.name = c.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        }
    }
    res.json(clients);
}

clientCtrl.searchclient = async (req, res ) => {
    const clients = await db.client.findAll({
        where: {
            nit: {
                [Op.like]: `%${req.query.documentId}%`
        }
    }});
    res.json(clients);
}

clientCtrl.post = async ( req, res ) => {
    const { name,phone,email,documentId } = req.body;
    const ClientCreate = await db.client.create({ 
        nit:documentId,
        name, 
        phone, 
        email, 
        status: 'true'
    });

    res.json({
        msg: 'Cliente creado',
        ClientCreate
    });
}


clientCtrl.update = async (req, res) => {
    try {
        const client = await db.client.findOne({
        where: {
            id: req.params.id,
        }});
        client.name = req.body.name.toLowerCase();
        client.nit = req.body.documentId;
        client.phone = req.body.phone;
        client.email = req.body.email;
        client.save();
        res.status(200).json({
            client,
            message: 'Cliente actualizado'
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

clientCtrl.delete = async (req, res) => {
    try {
        const client = await db.client.findOne({
        where: {
            id: req.params.id,
        }});
        client.status = 'false';
        client.save();
        res.status(200).json({
            client,
            message: 'Cliente eliminado'
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

clientCtrl.getAllReport = async (req, res) => {
    try {
        const clientes = await db.client.findAll({
            attributes: [['id', 'item_id'], ['name', 'item_text']],
            order: [
                ['name', 'ASC']
            ]
        })
        res.status(200).json(clientes)
    } catch (error) {
        res.json({ error: error})
    }
}

module.exports = clientCtrl;