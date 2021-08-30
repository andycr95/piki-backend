const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const AsignContainer = dbConnetionNew.define('contenedores', {
    id_contenedor: {
       type: DataTypes.STRING
    },
    id_turno: {
       type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = AsignContainer;