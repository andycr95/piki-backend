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

module.exports = typeCtrl;