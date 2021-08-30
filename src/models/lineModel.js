const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const TransLine = dbConnetionNew.define('lineas_transportadoras', {
    codigo: {
       type: DataTypes.STRING
    },
    descripcion: {
       type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});


module.exports = TransLine;