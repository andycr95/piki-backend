const db = require('../models');
const typeCtrl = {};

typeCtrl.get = async (req, res ) => {
    const typeContainers = await db.containerType.findAll({
        order: [
            ['description', 'ASC']
        ]
    });
    res.json(typeContainers);
}

typeCtrl.getWithContainers = async (req, res ) => {
    const typeContainers = await db.containerType.findAll({
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
    res.json(typeContainers);
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

module.exports = typeCtrl;