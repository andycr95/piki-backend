const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const Container = dbConnetionNew.define('contenedores', {
    codigo: {
       type: DataTypes.STRING
    },
    id_tipo: {
       type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = Container;