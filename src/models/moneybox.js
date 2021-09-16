'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class moneyBox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  moneyBox.init({
    goblalMoney: DataTypes.INTEGER,
    current: DataTypes.INTEGER,
    end: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'moneyBox',
  });
  return moneyBox;
};