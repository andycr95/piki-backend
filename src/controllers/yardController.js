const Yard = require('../models/yardModel')
const yardCtrl = {};


yardCtrl.get = async (req, res ) => {
    const yards = await Yard.findAll({
        order: [
            ['descripcion', 'ASC']
        ]
    });
    res.json(yards);
}

yardCtrl.post = async ( req, res ) => {
    const { descripcion,codigo } = req.body;
    const yardCreate = await Yard.create({ 
        descripcion:descripcion,
        codigo:codigo
    });

    res.json({
        msg: 'Patio de contendor creada',
        yardCreate
    });
}

module.exports = yardCtrl;