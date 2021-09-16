'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const salt = bcrypt.genSaltSync();
    await queryInterface.bulkInsert('users', [{
      "name":"Administrador",
      "phone":"3175555555",
      "login":"admiinpiki",
      "password": bcrypt.hashSync( '123456', salt ),
      "identification":"8889999288",
      "email":"adminpiki@gmail.com",
      "companyId":1,
      "roleId":1,
      "type":1
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
