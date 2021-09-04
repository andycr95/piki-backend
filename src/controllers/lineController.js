const db = require('../models');
const lineCtrl = {};


lineCtrl.get = async (req, res ) => {
    const transLine = await db.transLine.findAll({
        order: [
            ['description', 'ASC']
        ]
    });
    res.json(transLine);
}

lineCtrl.post = async ( req, res ) => {
    const { description,code } = req.body;
    const LineCreate = await db.transLine.create({ 
        description,
        code
    });

    res.json({
        msg: 'Linea de transportadora creada',
        LineCreate
    });
}

module.exports = lineCtrl;