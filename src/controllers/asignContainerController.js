const db = require('../models');
const asignContainer = {};


asignContainer.get = async (req, res ) => {
    const asignContainer = await db.asignContainerShift.findAll({
        where: {
            shiftId: req.params.id,
            status: 'true'
        }
    });
    res.json(asignContainer);
}

asignContainer.post = async ( req, res ) => {
    const { container, shift } = req.body;
    const asignContainersPost = await db.asignContainerShift.create({ 
        containerId: container,
        shiftId: shift, 
        status: 'true'
    });

    res.json({
        msg: 'post API - asignContainersPost',
        asignContainersPost
    });
}

module.exports = asignContainer;