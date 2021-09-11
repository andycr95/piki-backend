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
     await queryInterface.bulkInsert('companies', [{
      name: 'ciamsa',
      status: 'true'
    },
    {
      name: 'piki7',
      status: 'true'
    },
    {
      name: 'sident',
      status: 'true'
    },
    {
      name: 'piki7',
      status: 'true'
    },
    {
      name: 'zoloch',
      status: 'true'
    },
    {
      name: 'Cia. Transportadora',
      status: 'true'
    },
    {
      name: 'C.I. Carbones Suramericanos S.A.',
      status: 'true'
    },
    {
      name: 'Carbones Andinos S A S',
      status: 'true'
    },
    {
      name: 'Gerleinco',
      status: 'true'
    },
    {
      name: 'C.I. Bulk Trading Sur America LTDA',
      status: 'true'
    },
    {
      name: 'trenaco',
      status: 'true'
    },
    {
      name: 'Coquecol S.A. C.I',
      status: 'true'
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
  }
};
