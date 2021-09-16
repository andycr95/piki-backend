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

    await queryInterface.bulkInsert('containerTypes', [
    {
      code: 'Dry20',
      description: 'Dry - 20 Pies',
      status: 'true'
    },{
      code: 'Dry40',
      description: 'Dry - 40 Pies',
      status: 'true'
    },{
      code: 'HC40',
      description: 'High Cube - HC - 40 Pies',
      status: 'true'
    },{
      code: 'OP20',
      description: 'Open Top - OP - 20 Pies',
      status: 'true'
    },{
      code: 'OP40',
      description: 'Open Top - OP - 40 Pies',
      status: 'true'
    },{
      code: 'BLK20',
      description: 'Bulk - BLK - 20 Pies',
      status: 'true'
    },{
      code: 'Flt20',
      description: 'Flat - Plataformas Plegables - 20 Pies',
      status: 'true'
    },{
      code: 'Flt40',
      description: 'Flat - Plataformas Plegables - 40 Pies',
      status: 'true'
    },{
      code: 'OS20',
      description: 'Open Side - OS - 20 Pies',
      status: 'true'
    },{
      code: 'RF20',
      description: 'Reefer - RF - 20 Pies',
      status: 'true'
    },{
      code: 'RF40',
      description: 'Reefer - RF - 40 Pies',
      status: 'true'
    },{
      code: 'RH40',
      description: 'Reefer High Cube - RH- 40 Pies',
      status: 'true'
    },{
      code: 'ISO20 Pies',
      description: 'Iso Tank - ISO - 20 Pies',
      status: 'true'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('containerTypes', null, {});
  }
};
