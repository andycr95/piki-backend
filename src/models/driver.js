'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      driver.hasMany(models.shift);
    }
  };
  driver.init({
    identification: {
       type: DataTypes.STRING
    },
    name: {
       type: DataTypes.STRING
    },
    phone: {
       type: DataTypes.STRING
    },
    vehicle_plate: {
       type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    email: {
       type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'driver',
  });
  return driver;
};