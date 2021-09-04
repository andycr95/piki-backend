const db = require('../models');
const yardCtrl = {};


yardCtrl.get = async (req, res ) => {
    const yards = await db.containerYard.findAll({
        order: [
            ['description', 'ASC']
        ]
    });
    res.json(yards);
}

yardCtrl.post = async ( req, res ) => {
    const { description,code } = req.body;
    const yardCreate = await db.containerYard.create({ 
        description,
        code
    });

    res.json({
        msg: 'Patio de contendor creada',
        yardCreate
    });
}

module.exports = yardCtrl;