const { DataTypes } = require("sequelize");
const { dbConnetion } = require('../database/config');

const User = dbConnetion.define('usuarios', {
    nombre: {
       type: DataTypes.STRING
    },
    login: {
       type: DataTypes.STRING
    },
    clave: {
       type: DataTypes.STRING
    },
    telefono: {
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
        type: DataTypes.BOOLEAN
    }
   /*  pass: {
       type: DataTypes.STRING
    } */

});


module.exports = User;