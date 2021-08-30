const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const Shift = dbConnetionNew.define('turnos', {
    fecha_limite: {
       type: DataTypes.DATEONLY
    },
    id_cliente: {
       type: DataTypes.INTEGER
    },
    id_conductor: {
       type: DataTypes.INTEGER
    },
    id_linea: {
       type: DataTypes.INTEGER
    },
    id_usuario: {
       type: DataTypes.INTEGER
    },
    id_clase: {
       type: DataTypes.INTEGER
    },
    id_patio: {
       type: DataTypes.INTEGER
    },
    precio: {
       type: DataTypes.INTEGER
    },
    consecutivo: {
       type: DataTypes.INTEGER
    },
    turno_global: {
       type: DataTypes.INTEGER
    },
    observaciones: {
       type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = Shift;