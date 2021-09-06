const db = require('../models');
const containerCtrl = {};


containerCtrl.get = async (req, res ) => {
    const containers = await db.container.find();
    res.json(containers);
}

containerCtrl.post = async ( req, res ) => {
    const { container, typeCode } = req.body;
    const type = await db.containerType.findOne({
        where: {
            code: typeCode,
            status: 'true'
        }
    });
    const ContainerCreate = await db.container.create({ 
        code:container,
        typeId:type.id, 
        status: 'true'
    });

    res.json({
        msg: 'post API - containersPost',
        ContainerCreate
    });
}

module.exports = containerCtrl;