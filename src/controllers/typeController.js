const db = require('../models');
const typeCtrl = {};

typeCtrl.get = async (req, res ) => {
    const containerTypes = await db.containerType.findAll({
        order: [
            ['description', 'ASC']
        ]
    });
    res.json(containerTypes);
}

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

typeCtrl.post = async ( req, res ) => {
    const { description,code } = req.body;
    const TypeCreate = await db.containerType.create({ 
        description,
        code,
        status: 'true',
    });

    res.json({
        msg: 'Tipo de contendor creado',
        TypeCreate
    });
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