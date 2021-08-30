const TransLine = require('../models/lineModel')
const lineCtrl = {};


lineCtrl.get = async (req, res ) => {
    const transLine = await TransLine.findAll({
        order: [
            ['descripcion', 'ASC']
        ]
    });
    res.json(transLine);
}

lineCtrl.post = async ( req, res ) => {
    const { descripcion,codigo } = req.body;
    const LineCreate = await TransLine.create({ 
        descripcion:descripcion,
        codigo:codigo
    });

    res.json({
        msg: 'Linea de transportadora creada',
        LineCreate
    });
}

module.exports = lineCtrl;