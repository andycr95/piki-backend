'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    await queryInterface.bulkInsert('shiftClasses', [{
      name: 'carretera',
      price:  8000,
      status: 'true'
    },{
      name: 'urbanero',
      price:  8000,
      status: 'true'
    },{
      name: 'exportacion',
      price:  5000,
      status: 'true'
    },{
      name: 'reposiciones',
      price:  8000,
      status: 'true'
    },]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('shiftClasses', null, {});
  }
};
