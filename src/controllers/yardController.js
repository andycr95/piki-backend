const db = require('../models');
const yardCtrl = {};

yardCtrl.get = async (req, res) => {
    try {
        const containerYardes = await db.containerYard.findAll({
            where: {
                status: 'true'
            },
            order: [
                ['description', 'ASC']
            ]
        })
        for (let i = 0; i < containerYardes.length; i++) {
            const sc = containerYardes[i];
            sc.description = sc.description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        }
        res.status(200).json(containerYardes);
    } catch (error) {
        res.json({ error: error});
    }
}

yardCtrl.create = async ( req, res ) => {
    const { description,code} = req.body;
    const containerYardCreate = await db.containerYard.create({ 
        description,
        code,
        status: 'true'
    });

    res.json({
        containerYardCreate,
        message: 'Patio de contendores creado'
    });
}

yardCtrl.update = async (req, res) => {
    try {
        const containerYard = await db.containerYard.findOne({
        where: {
            id: req.params.id,
        }});
        containerYard.description = req.body.description.toLowerCase();
        containerYard.code = req.body.code;
        await containerYard.save();
        res.status(200).json({
            containerYard,
            message: 'Patio de contendores actualizado'
        });
    } catch (error) {
        res.json({ error: error});
    }
}

yardCtrl.delete = async (req, res) => {
    try {
        const containerYard = await db.containerYard.findOne({
        where: {
            id: req.params.id,
        }});
        containerYard.status = 'false';
        await containerYard.save();
        res.status(200).json({
            containerYard,
            message: 'Patio de contendores eliminado'
        });
    } catch (error) {
        res.json({ error: error});
    }
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