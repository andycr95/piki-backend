const db = require('../models');
const shiftClassCtrl = {};


shiftClassCtrl.getAllReport = async (req, res) => {
    try {
        const clases = await db.shiftClass.findAll({
            attributes: [['id', 'item_id'], ['name', 'item_text']],
            order: [
                ['name', 'ASC']
            ]
        })
        res.status(200).json(clases)
    } catch (error) {
        res.json({ error: error})
    }
}

module.exports = shiftClassCtrl;