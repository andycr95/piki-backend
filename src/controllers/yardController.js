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

yardCtrl.getAllReport = async (req, res) => {
    try {
        const patios = await db.containerYard.findAll({
            attributes: [['id', 'item_id'], ['description', 'item_text']],
            order: [
                ['description', 'ASC']
            ]
        })
        res.status(200).json(patios)
    } catch (error) {
        res.json({ error: error})
    }
}

module.exports = yardCtrl;