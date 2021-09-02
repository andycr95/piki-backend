const TypeContainer = require('../models/containertype')
const typeCtrl = {};

typeCtrl.get = async (req, res ) => {
    const typeContainers = await TypeContainer.findAll({
        order: [
            ['description', 'ASC']
        ]
    });
    res.json(typeContainers);
}

typeCtrl.post = async ( req, res ) => {
    const { description,code } = req.body;
    const TypeCreate = await TypeContainer.create({ 
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