const { Sequelize } = require('sequelize');
const { development } = require('../config/config');

// Old database connection.
/* const dbConnetion = new Sequelize(`${process.env.DATABASE}`, `${process.env.ROOT}`, `${process.env.PASS}`, {
    host: '192.241.155.75',
    dialect: 'mysql',
   
}); */

// New database connection.
const dbConnectionDev = new Sequelize(development.database, development.username, development.password, {
    host: development.host,
    dialect: development.dialect,
    logging: false,
    define: {
        underscored: true
    }
});


module.exports = {  dbConnectionDev };
