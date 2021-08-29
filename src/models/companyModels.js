const { DataTypes } = require("sequelize");
const { dbConnetionNew } = require('../database/config');

const Company = dbConnetionNew.define('Company', {
   
    nombre: {
       type: DataTypes.STRING
    },
  
     status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
      
   }

},
{
   dbConnetionNew,
   modelName: 'Company',
   tableName: 'empresas'
});


module.exports = Company;