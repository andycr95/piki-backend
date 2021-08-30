const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const Client = dbConnetionNew.define('clientes', {
    nit: {
       type: DataTypes.STRING
    },
    nombre: {
       type: DataTypes.STRING
    },
    correo: {
       type: DataTypes.STRING
    },
    telefono: {
       type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = Client;