const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Client = require('../models/client')
const clientCtrl = {};
const db = require('../models');

clientCtrl.get = async (req, res ) => {
    const clients = await Client.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
    for (let i = 0; i < clients.length; i++) {
        const c = clients[i];
        c.name = c.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
    res.json(clients);
}

clientCtrl.searchclient = async (req, res ) => {
    const clients = await Client.findAll({
        where: {
            nit: {
                [Op.like]: `%${req.query.documentId}%`
        }
    }});
    res.json(clients);
}

clientCtrl.post = async ( req, res ) => {
    const { name,phone,email,documentId } = req.body;
    const ClientCreate = await Client.create({ 
        nit:documentId,
        name, 
        phone, 
        email, 
        status: 'true'
    });

    res.json({
        msg: 'post API - clientsPost',
        ClientCreate
    });
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