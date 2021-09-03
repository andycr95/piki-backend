'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transLine.hasMany(models.shift);
    }
  };
  transLine.init({
    code: {
       type: DataTypes.STRING
    },
    description: {
       type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'transLine',
  });
  return transLine;
};