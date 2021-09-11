
const { Sequelize } = require('sequelize');

// Old database connection.
// const dbConnetion = new Sequelize(`${process.env.DATABASE}`, `${process.env.ROOT}`, `${process.env.PASS}`, {
//     host: 'localhost',
//     dialect: 'mysql',
   
// });

// New database connection.
const dbConnetionNew = new Sequelize(`${process.env.DATABASE_NEW}`, `${process.env.ROOT_NEW}`, `${process.env.PASS_NEW}`, {
    host: '192.241.155.75',
    dialect: 'mysql',
    logging: false,
});


module.exports = {  dbConnetionNew };
