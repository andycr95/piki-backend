const managementCtrl = {}
const { Sequelize } = require('../models');
const db = require('../models');

managementCtrl.getInfo = async (req, res) => {
    try {
        const info = await db.shift.findAll({
                                                where: { 
                                                    status : 'true' 
                                                },
                                                include: [
                                                    {
                                                        model: db.containerYard,
                                                        where: { id: Sequelize.col('containerYardId') }
                                                    },
                                                    {
                                                        model: db.client,
                                                        where: { id: Sequelize.col('clientId') }
                                                    },
                                                    {
                                                        model: db.driver,
                                                        where: { id: Sequelize.col('driverId') }
                                                    },
                                                    {
                                                        model: db.transLine,
                                                        where: { id: Sequelize.col('transLineId') }
                                                    },
                                                    {
                                                        model: db.shiftClass,
                                                        where: { id: Sequelize.col('shiftClassId') }
                                                    },
                                                    {
                                                        model: db.container, as: 'containers', include:{
                                                            model: db.containerType, as: 'containerType' 
                                                        } 
                                                    }
                                                ]
                                            });
        return res.status(200).json({ info });
    } catch (error) {
        return  res.json({ message: error.message});
    }
}

managementCtrl.getCanceled = async (req, res) => {
    try {
        const info = await db.shift.findAll({
                                                where: { 
                                                    status : 'false' 
                                                },
                                                include: [
                                                    {
                                                        model: db.containerYard,
                                                        where: { id: Sequelize.col('containerYardId') }
                                                    },
                                                    {
                                                        model: db.client,
                                                        where: { id: Sequelize.col('clientId') }
                                                    },
                                                    {
                                                        model: db.driver,
                                                        where: { id: Sequelize.col('driverId') }
                                                    },
                                                    {
                                                        model: db.transLine,
                                                        where: { id: Sequelize.col('transLineId') }
                                                    },
                                                    {
                                                        model: db.shiftClass,
                                                        where: { id: Sequelize.col('shiftClassId') }
                                                    },
                                                    {
                                                        model: db.container, as: 'containers', include:{
                                                            model: db.containerType, as: 'containerType' 
                                                        } 
                                                    }
                                                ]
                                            });
        return res.status(200).json({ info });
    } catch (error) {
        return  res.json({ message: error.message});
    }
}

managementCtrl.getShiftById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundShift = await db.shift.findOne({
                                                    where: { 
                                                        id: id
                                                    },
                                                    include: [
                                                        {
                                                            model: db.containerYard,
                                                            where: { id: Sequelize.col('containerYardId') }
                                                        },
                                                        {
                                                            model: db.client,
                                                            where: { id: Sequelize.col('clientId') }
                                                        },
                                                        {
                                                            model: db.driver,
                                                            where: { id: Sequelize.col('driverId') }
                                                        },
                                                        {
                                                            model: db.transLine,
                                                            where: { id: Sequelize.col('transLineId') }
                                                        },
                                                        {
                                                            model: db.shiftClass,
                                                            where: { id: Sequelize.col('shiftClassId') }
                                                        },
                                                        {
                                                            model: db.container, as: 'containers', include:{
                                                                model: db.containerType, as: 'containerType' 
                                                            } 
                                                        }
                                                    ]
                                                });
        if( !foundShift ) return res.status( 400 ).json({ message: `El turno no está registrado` });
        return res.status(200).json({foundShift}); 
    } catch (error) {
        return  res.json({ message: error.message});
    }
}

managementCtrl.saveShift = async (req, res) => {
    try {
        const { id } = req.params;
        const foundShift = await db.shift.findByPk( id );
        if( !foundShift ) return res.status( 400 ).json({ message: `El turno no está registrado` });
        const { obvs } = req.body;
        await db.shift.update({ obvs: obvs }, { where: { id: id }}).then(() => {
            return res.status( 200 ).json({ message: 'Observación registrada con éxito'});
        });
    } catch (error) {
        return  res.send({message: error.message});
    }
}

module.exports = managementCtrl;