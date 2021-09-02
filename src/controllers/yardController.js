const Yard = require('../models/containeryard')
const yardCtrl = {};


yardCtrl.get = async (req, res ) => {
    const yards = await Yard.findAll({
        order: [
            ['description', 'ASC']
        ]
    });
    res.json(yards);
}

yardCtrl.post = async ( req, res ) => {
    const { description,code } = req.body;
    const yardCreate = await Yard.create({ 
        description,
        code
    });

    res.json({
        msg: 'Patio de contendor creada',
        yardCreate
    });
}

module.exports = yardCtrl;