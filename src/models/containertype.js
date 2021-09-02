'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class containerType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  containerType.init({
    code: {
       type: DataTypes.STRING
    },
    description: {
       type: DataTypes.STRING
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'containerType',
  });
  return containerType;
};