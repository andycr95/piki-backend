const db = require('../models');
const containerCtrl = {};


containerCtrl.get = async (req, res ) => {
    const containers = await db.container.findAll();
    res.json(containers);
}

containerCtrl.post = async ( req, res ) => {
    const { container, typeCode, shiftId } = req.body;
    const type = await db.containerType.findOne({
        where: {
            code: typeCode,
            status: 'true'
        }
    });
    const ContainerCreate = await db.container.create({ 
        code:container,
        containerTypeId:type.id, 
        shiftId,
        status: 'true'
    });

    res.json({
        msg: 'post API - containersPost',
        ContainerCreate
    });
}

async function createContainer(containers) {
    for (let i = 0; i < containers.length; i++) {
        const c = containers[i];
        const type = await db.containerType.findOne({
            where: {
                code: c.typeCode,
                status: 'true'
            }
        });
        await db.container.create({ 
            code:c.container,
            containerTypeId:type.id, 
            shiftId:c.shiftId,
            status: 'true'
        });
        
    }
}

module.exports = { containerCtrl, createContainer };