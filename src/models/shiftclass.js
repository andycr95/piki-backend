'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shiftClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shiftClass.hasMany(models.Shitf);
    }
  };
  shiftClass.init({
    name: {
       type: DataTypes.STRING
    },
    price: {
       type: DataTypes.STRING
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'shiftClass',
  });
  return shiftClass;
};