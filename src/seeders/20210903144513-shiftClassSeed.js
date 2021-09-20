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
      id: 1,
      name: 'carretera',
      price:  16000,
      status: 'true'
    },{
      id: 2,
      name: 'urbanero',
      price:  8000,
      status: 'true'
    },{
      id: 3,
      name: 'exportacion',
      price:  5000,
      status: 'true'
    },{
      id: 4,
      name: 'reposiciones',
      price:  8000,
      status: 'true'
    },{
      id: 5,
      name: 'reenturne carretera',
      price:  8000,
      status: 'true'
    },{
      id: 6,
      name: 'reenturne carretera',
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
