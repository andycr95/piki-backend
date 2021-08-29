const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const User = dbConnetionNew.define('User', {
   
   ident: {
      type: DataTypes.STRING,
     
   },
    nombre: {
       type: DataTypes.STRING
    },
    login: {
       type: DataTypes.STRING
    },
    clave: {
       type: DataTypes.STRING
    },
    correo: {
       type: DataTypes.STRING
    },
    empresa: {
       type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.INTEGER
    },
    creador: {
       type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
     },
     status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
      
   }

},
{
   dbConnetionNew,
   modelName: 'User',
   tableName: 'usuarios'
});


module.exports = User;