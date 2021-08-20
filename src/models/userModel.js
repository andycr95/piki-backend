const { DataTypes } = require("sequelize");
const { dbConnetion } = require('../database/config');

const User = dbConnetion.define('Users', {
    name: {
       type: DataTypes.STRING
    },
    surname: {
       type: DataTypes.STRING
    },
    phone: {
       type: DataTypes.STRING
    },
    email: {
       type: DataTypes.STRING
    },
    pass: {
       type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    pass: {
       type: DataTypes.STRING
    }

});


module.exports = User;