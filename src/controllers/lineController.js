const TransLine = require('../models/transline')
const lineCtrl = {};


lineCtrl.get = async (req, res ) => {
    const transLine = await TransLine.findAll({
        order: [
            ['description', 'ASC']
        ]
    });
    res.json(transLine);
}

lineCtrl.post = async ( req, res ) => {
    const { description,code } = req.body;
    const LineCreate = await TransLine.create({ 
        description,
        code
    });

    res.json({
        msg: 'Linea de transportadora creada',
        LineCreate
    });
}

module.exports = lineCtrl;