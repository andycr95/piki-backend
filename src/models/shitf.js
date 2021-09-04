'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shitf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shitf.belongsTo(models.client);
      Shitf.belongsTo(models.driver);
      Shitf.belongsTo(models.transLine);
      Shitf.belongsTo(models.containerYard);
    }
  };
  Shitf.init({
      limitDate: {
         type: DataTypes.DATEONLY
      },
      clientId: {
         type: DataTypes.INTEGER,
         references: {
            model: 'clients',
            key: 'id'
         },
         onUpdate: 'NO ACTION',
         onDelete: 'NO ACTION',
      },
      driverId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'drivers',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      lineId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'transLines',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      shiftClassId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'shiftClasses',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      containerYardId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'containerYards',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      price: {
        type: DataTypes.INTEGER
      },
      dayShift: {
        type: DataTypes.INTEGER
      },
      globalShift: {
        type: DataTypes.INTEGER
      },
      obvs: {
        type: DataTypes.STRING
      },
      status: {
          type: DataTypes.BOOLEAN
      }
    }, {
    sequelize,
    modelName: 'Shitf',
  });

  return Shitf;
};