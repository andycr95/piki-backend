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

    await queryInterface.bulkInsert('containerYards', [{
      code: 'AGUA DULCE',
      description:  'AGUA DULCE',
      status: 'true'
    }, {
      code: 'Cemue',
      description: 'Cemue',
      status: 'true'
    }, {
      code: 'Patios Colombia',
      description: 'Patios Colombia',
      status: 'true'
    }, {
      code: 'Patios ZAL',
      description: 'Patios ZAL',
      status: 'true'
    }, {
      code: 'PCC-G',
      description: 'PCC - Gerleinco',
      status: 'true'
    }, {
      code: 'PCC-SIM',
      description: 'PCC - SIMARITIMA',
      status: 'true'
    }, {
      code: 'PCC-TCS',
      description: 'PCC - TCBUEN SIM',
      status: 'true'
    }, {
      code: 'PCC-SPS',
      description: 'PCC - SPRBUN SIM',
      status: 'true'
    }, {
      code: 'PCC-PZ',
      description: 'PCC - PATIOS ZAL',
      status: 'true'
    }, {
      code: 'SPRBUN',
      description: 'SPRBUN',
      status: 'true'
    }, {
      code: 'SPRBUN-G',
      description: 'SPRBUN Gerleinco',
      status: 'true'
    }, {
      code: 'SPRBUNS',
      description: 'SPRBUN SIMARITIMA',
      status: 'true'
    }, {
      code: 'SPRBUNSIM',
      description: 'SPRBUNSIM - SIMARITIMA',
      status: 'true'
    }, {
      code: 'SPRBUNPZ',
      description: 'SPRBUN - PATIOS ZAL',
      status: 'true'
    }, {
      code: 'TCBUEN',
      description: 'TCBUEN',
      status: 'true'
    }, {
      code: 'TCBUEN',
      description: 'TCBUEN Gerleinco',
      status: 'true'
    }, {
      code: 'TCBUENSPS',
      description: 'TCBUEN SIM- SPRBUN SIM',
      status: 'true'
    }, {
      code: 'TCBUENSIM',
      description: 'TCBUEN SIM - Simaritima',
      status: 'true'
    }, {
      code: 'TCBUENSM',
      description: 'TCBUEN Simaritima',
      status: 'true'
    }, {
      code: 'TCBUENPCC',
      description: 'TCBUEN - PCC',
      status: 'true'
    }, {
      code: 'TCBUENPZ',
      description: 'TCBUEN - PATIOS ZAL',
      status: 'true'
    }, {
      code: 'SIMARITIMA',
      description: 'SIMARITIMA',
      status: 'true'
    }, {
      code: 'ZELSA',
      description: 'ZELSA',
      status: 'true'
    }, {
      code: 'PINTERMODAL',
      description: 'PATIO INTERMODAL',
      status: 'true'
    }, {
      code: 'ZONA FRANCA',
      description: 'ZONA FRANCA',
      status: 'true'
    }, {
      code: 'ZFspr',
      description: 'ZONA FRANCA SPRBUN',
      status: 'true'
    }, {
      code: 'ZFtcb',
      description: 'ZONA FRANCA TCBUEN',
      status: 'true'
    }, {
      code: 'ZFpcc',
      description: 'ZONA FRANCA PCC',
      status: 'true'
    }, {
      code: 'ZFsim',
      description: 'ZONA FRANCA SIMARITIMA',
      status: 'true'
    }, {
      code: 'ZFim',
      description: 'ZONA FRANCA INTERMODAL',
      status: 'true'
    }, {
      code: 'Colfpcc',
      description: 'COLFERCAR - PCC',
      status: 'true'
    }, {
      code: 'Colfsim',
      description: 'COLFERCAR - SIMARITIMA',
      status: 'true'
    }, {
      code: 'Colfspr',
      description: 'COLFERCAR - SPR',
      status: 'true'
    }, {
      code: 'Colftd',
      description: 'COLFERCAR - TRANSDEPORT',
      status: 'true'
    }, {
      code: 'Transdepot',
      description: 'TRANSDEPOT',
      status: 'true'
    }, {
      code: 'Transdcol',
      description: 'TRANSDEPORT - COLFECAR',
      status: 'true'
    }, {
      code: 'Transdsim',
      description: 'TRANSDEPORT - SIMARITIMA',
      status: 'true'
    }, {
      code: 'Transdtcb',
      description: 'TRANSDEPORT - TCBUEN',
      status: 'true'
    }, {
      code: 'Transdspr',
      description: 'TRANSDEPORT - SPR',
      status: 'true'
    }, {
      code: 'Transdpcc',
      description: 'TRANSDEPORT - PCC',
      status: 'true'
    }, {
      code: 'ZFtd',
      description: 'ZONA FRANCA TRANSDEPOT',
      status: 'true'
    }]);
  },


  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('containerYards', null, {});
  }
};
