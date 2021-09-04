'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD:src/models/shitf.js
      Shitf.belongsTo(models.client);
      Shitf.belongsTo(models.driver);
      Shitf.belongsTo(models.transLine);
      Shitf.belongsTo(models.containerYard);
=======
      Shift.belongsTo(models.client);
      Shift.belongsTo(models.driver);
      Shift.belongsTo(models.transLine);
      Shift.belongsTo(models.shiftClass);
      Shift.belongsTo(models.containerYard);  
>>>>>>> dev:src/models/shift.js
    }
  };
  Shift.init({
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
      transLineId: {
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
          model: 'users',
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
<<<<<<< HEAD:src/models/shitf.js
          type: DataTypes.BOOLEAN
      }
    }, {
=======
        type: DataTypes.STRING,
        defaultValue: true
      }
  }, {
>>>>>>> dev:src/models/shift.js
    sequelize,
    modelName: 'shift',
  });
<<<<<<< HEAD:src/models/shitf.js

  return Shitf;
=======
  return Shift;
>>>>>>> dev:src/models/shift.js
};