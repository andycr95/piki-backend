const Container = require('../models/container');
const TypeContainer = require('../models/containertype');
const containerCtrl = {};


containerCtrl.get = async (req, res ) => {
    const containers = await Container.find();
    res.json(containers);
}

containerCtrl.post = async ( req, res ) => {
    const { container, containerType } = req.body;
    const type = await TypeContainer.findOne({
        where: {
            codigo: containerType,
            status: 'true'
        }
    });
    const ContainerCreate = await Container.create({ 
        codigo:container,
        id_tipo:type.id, 
        status: 'true'
    });

    res.json({
        msg: 'post API - containersPost',
        ContainerCreate
    });
}

module.exports = containerCtrl;