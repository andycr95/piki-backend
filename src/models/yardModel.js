const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const Yard = dbConnetionNew.define('patios', {
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


module.exports = Yard;