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
    await queryInterface.bulkInsert('companies', [
      {
        name: 'ciamsa',
        status: 1
      },
      {
        name: 'piki7',
        status: 1
      },
      {
        name: 'sident',
        status: 1
      },
      {
        name: 'zoloch',
        status: 1
      },
      {
        name: 'Cia. Transportadora',
        status: 1
      },
      {
        name: 'C.I. Carbones Suramericanos S.A.',
        status: 1
      },
      {
        name: 'Carbones Andinos S A S',
        status: 1
      },
      {
        name: 'Gerleinco',
        status: 1
      },
      {
        name: 'C.I. Bulk Trading Sur America LTDA',
        status: 1
      },
      {
        name: 'trenaco',
        status: 1
      },
      {
        name: 'Coquecol S.A. C.I',
        status: 1
      }
])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('companies', null, {});
  }
};
