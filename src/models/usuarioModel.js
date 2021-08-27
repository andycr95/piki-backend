const { Sequelize, DataTypes, Model } = require('sequelize');
const { dbConnetionNew } = require('../database/config');

class User extends Model {}

User.init({
  // Model attributes are defined here
  cedula: {
    type: DataTypes.STRING,
    primaryKey: true
 },
  nombre: {
     type: DataTypes.STRING
  },
  login: {
     type: DataTypes.STRING
  },
  clave: {
     type: DataTypes.STRING
  },
  correo: {
     type: DataTypes.STRING
  },
  empresa: {
     type: DataTypes.STRING
  },
  tipo: {
      type: DataTypes.INTEGER
  },
  creador: {
     type: DataTypes.STRING
  },
  telefono: {
      type: DataTypes.STRING
   },
}, {
  // Other model options go here
  dbConnetionNew, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});