
const { Sequelize } = require('sequelize');

const dbConnetion = new Sequelize(`${process.env.DATABASE}`, `${process.env.ROOT}`, `${process.env.PASS}`, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = { dbConnetion };