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

lineCtrl.getAllReport = async (req, res) => {
    try {
        const lineas = await db.transLine.findAll({
            attributes: [['id', 'item_id'], ['description', 'item_text']],
            order: [
                ['description', 'ASC']
            ]
        })
        res.status(200).json(lineas)
    } catch (error) {
        res.json({ error: error})
    }
}

module.exports = lineCtrl;