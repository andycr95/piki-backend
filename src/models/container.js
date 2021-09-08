'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Container extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Container.belongsTo(models.containerType);
      Container.belongsTo(models.shift);
    }
  };
  Container.init({
    code: {
       type: DataTypes.STRING
    },
    containerTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'containerTypes',
        key: 'id'
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION',
    },
    shiftId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'shifts',
        key: 'id'
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'container',
  });
  return Container;
};