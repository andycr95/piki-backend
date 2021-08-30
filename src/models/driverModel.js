const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const Driver = dbConnetionNew.define('conductores', {
    identificacion: {
       type: DataTypes.STRING
    },
    nombre: {
       type: DataTypes.STRING
    },
    telefono: {
       type: DataTypes.STRING
    },
    placa_vehiculo: {
       type: DataTypes.STRING
    },
    correo: {
       type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});


module.exports = Driver;