const AsignContainer = require('../models/asignContainerModel');
const asignContainer = {};


asignContainer.get = async (req, res ) => {
    const asignContainer = await AsignContainer.findAll({
        where: {
            id_turno: req.params.id,
            status: 'true'
        }
    });
    res.json(asignContainer);
}

asignContainer.post = async ( req, res ) => {
    const { container, shift } = req.body;
    const asignContainersPost = await AsignContainer.create({ 
        id_contenedor: container,
        id_turno: shift, 
        status: 'true'
    });

    res.json({
        msg: 'post API - asignContainersPost',
        asignContainersPost
    });
}

module.exports = asignContainer;