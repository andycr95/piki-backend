const db = require('../models');
const typeCtrl = {};

typeCtrl.getWithContainers = async (req, res ) => {
    const containerTypes = await db.containerType.findAll({
        order: [
            ['description', 'ASC']
        ],
        include: [
            {
                model: db.container,
                as: 'Instruments'
            }
        ]
    });
    res.json(containerTypes);
}

typeCtrl.get = async (req, res) => {
    try {
        const containerTypes = await db.containerType.findAll({
            where: {
                status: 'true'
            },
            order: [
                ['description', 'ASC']
            ]
        })
        for (let i = 0; i < containerTypes.length; i++) {
            const sc = containerTypes[i];
            sc.description = sc.description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        }
        res.status(200).json(containerTypes);
    } catch (error) {
        res.json({ error: error});
    }
}

typeCtrl.create = async ( req, res ) => {
    const { description,code} = req.body;
    try {
        const containerTypeCreate = await db.containerType.create({ 
            description,
            code,
            status: 'true'
        });
    
        res.json({
            containerTypeCreate,
            message: 'Tipo de contendor creado'
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

typeCtrl.update = async (req, res) => {
    try {
        const containerType = await db.containerType.findOne({
        where: {
            id: req.params.id,
        }});
        containerType.description = req.body.description.toLowerCase();
        containerType.code = req.body.code;
        await containerType.save();
        res.status(200).json({
            containerType,
            message: 'Tipo de contendor actualizado'
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

typeCtrl.delete = async (req, res) => {
    try {
        const containerType = await db.containerType.findOne({
        where: {
            id: req.params.id,
        }});
        containerType.status = 'false';
        await containerType.save();
        res.status(200).json({
            containerType,
            message: 'Tipo de contendor eliminado'
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

typeCtrl.getAllReport = async (req, res) => {
    try {
        const tiposTamanios = await db.containerType.findAll({
            attributes: [['id', 'item_id'], ['description', 'item_text']],
            order: [
                ['description', 'ASC']
            ]
        })
        res.status(200).json(tiposTamanios)
    } catch (error) {
        res.json({ error: error})
    }
}

module.exports = typeCtrl;