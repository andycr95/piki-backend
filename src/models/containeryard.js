'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class containerYard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      containerYard.hasMany(models.shift);
    }
  };
  containerYard.init({
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
    modelName: 'containerYard',
  });
  return containerYard;
};