const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const TypeContainer = dbConnetionNew.define('tipo_contenedores', {
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


module.exports = TypeContainer;