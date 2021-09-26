const db = require('../models');
const lineCtrl = {};

lineCtrl.get = async (req, res) => {
    try {
        const transLines = await db.transLine.findAll({
            where: {
                status: 'true'
            },
            order: [
                ['description', 'ASC']
            ]
        })
        for (let i = 0; i < transLines.length; i++) {
            const sc = transLines[i];
            sc.description = sc.description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        }
        res.status(200).json(transLines);
    } catch (error) {
        res.json({ error: error});
    }
}

lineCtrl.create = async ( req, res ) => {
    const { description,code} = req.body;
    try {
        const transLineCreate = await db.transLine.create({ 
            description,
            code,
            status: 'true'
        });
    
        res.json({
            transLineCreate,
            message: 'Linea de transportadora creada'
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

lineCtrl.update = async (req, res) => {
    try {
        const transLine = await db.transLine.findOne({
        where: {
            id: req.params.id,
        }});
        transLine.description = req.body.description.toLowerCase();
        transLine.code = req.body.code;
        await transLine.save();
        res.status(200).json({
            transLine,
            message: 'Linea de transportadora actualizada'
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

lineCtrl.delete = async (req, res) => {
    try {
        const transLine = await db.transLine.findOne({
        where: {
            id: req.params.id,
        }});
        transLine.status = 'false';
        await transLine.save();
        res.status(200).json({
            transLine,
            message: 'Linea de transportadora eliminada'
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
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
        res.status(500).json({ error: error})
    }
}

module.exports = lineCtrl;