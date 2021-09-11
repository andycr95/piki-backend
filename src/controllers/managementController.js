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

module.exports = managementCtrl;