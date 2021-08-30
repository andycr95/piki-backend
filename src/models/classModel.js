const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const ClassShift = dbConnetionNew.define('clases', {
    nombre: {
       type: DataTypes.STRING
    },
    precio: {
       type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});


module.exports = ClassShift;