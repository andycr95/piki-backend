'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      client.hasMany(models.shift);
    }
  };
  client.init({
    nit: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: true
    }

  }, {
    sequelize,
    modelName: 'client',
    tableName: 'clients'
  });
  return client;
};