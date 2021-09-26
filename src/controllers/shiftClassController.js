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

shiftClassCtrl.get = async (req, res) => {
    try {
        const shiftClasses = await db.shiftClass.findAll({
            where: {
                status: 'true'
            },
            order: [
                ['name', 'ASC']
            ]
        })
        for (let i = 0; i < shiftClasses.length; i++) {
            const sc = shiftClasses[i];
            sc.name = sc.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        }
        res.status(200).json(shiftClasses);
    } catch (error) {
        res.json({ error: error});
    }
}

shiftClassCtrl.create = async ( req, res ) => {
    const { name,price} = req.body;
    const shiftClassCreate = await db.shiftClass.create({ 
        name,
        price,
        status: 'true'
    });

    res.json({
        shiftClassCreate,
        message: 'Clase creada'
    });
}

shiftClassCtrl.update = async (req, res) => {
    try {
        const shiftClass = await db.shiftClass.findOne({
        where: {
            id: req.params.id,
        }});
        shiftClass.name = req.body.name.toLowerCase();
        shiftClass.price = req.body.price;
        await shiftClass.save();
        res.status(200).json({
            shiftClass,
            message: 'Clase actualizada'
        });
    } catch (error) {
        res.json({ error: error});
    }
}

shiftClassCtrl.delete = async (req, res) => {
    try {
        const shiftClass = await db.shiftClass.findOne({
        where: {
            id: req.params.id,
        }});
        shiftClass.status = 'false';
        shiftClass.save();
        res.status(200).json({
            shiftClass,
            message: 'Clase eliminada'
        });
    } catch (error) {
        res.json({ error: error});
    }
}


module.exports = shiftClassCtrl;