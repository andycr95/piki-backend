const TypeContainer = require('../models/typeModel')
const typeCtrl = {};

typeCtrl.get = async (req, res ) => {
    const typeContainers = await TypeContainer.findAll({
        order: [
            ['descripcion', 'ASC']
        ]
    });
    res.json(typeContainers);
}

typeCtrl.post = async ( req, res ) => {
    const { descripcion,codigo } = req.body;
    const TypeCreate = await TypeContainer.create({ 
        descripcion:descripcion,
        codigo:codigo,
        status: 'true',
    });

    res.json({
        msg: 'Tipo de contendor creado',
        TypeCreate
    });
}

module.exports = typeCtrl;