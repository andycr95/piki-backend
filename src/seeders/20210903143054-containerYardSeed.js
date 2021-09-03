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

    await queryInterface.bulkInsert('containerTypes', [{
      code: 'AGUA DULCE',
      description:  'AGUA DULCE'
    }, {
      code: 'Cemue',
      description: 'Cemue'
    }, {
      code: 'Patios Colombia',
      description: 'Patios Colombia'
    }, {
      code: 'Patios ZAL',
      description: 'Patios ZAL'
    }, {
      code: 'PCC-G',
      description: 'PCC - Gerleinco'
    }, {
      code: 'PCC-SIM',
      description: 'PCC - SIMARITIMA'
    }, {
      code: 'PCC-TCS',
      description: 'PCC - TCBUEN SIM'
    }, {
      code: 'PCC-SPS',
      description: 'PCC - SPRBUN SIM'
    }, {
      code: 'PCC-PZ',
      description: 'PCC - PATIOS ZAL'
    }, {
      code: 'SPRBUN',
      description: 'SPRBUN'
    }, {
      code: 'SPRBUN-G',
      description: 'SPRBUN Gerleinco'
    }, {
      code: 'SPRBUNS',
      description: 'SPRBUN SIMARITIMA'
    }, {
      code: 'SPRBUNSIM',
      description: 'SPRBUNSIM - SIMARITIMA'
    }, {
      code: 'SPRBUNPZ',
      description: 'SPRBUN - PATIOS ZAL'
    }, {
      code: 'TCBUEN',
      description: 'TCBUEN'
    }, {
      code: 'TCBUEN',
      description: 'TCBUEN Gerleinco'
    }, {
      code: 'TCBUENSPS',
      description: 'TCBUEN SIM- SPRBUN SIM'
    }, {
      code: 'TCBUENSIM',
      description: 'TCBUEN SIM - Simaritima'
    }, {
      code: 'TCBUENSM',
      description: 'TCBUEN Simaritima'
    }, {
      code: 'TCBUENPCC',
      description: 'TCBUEN - PCC'
    }, {
      code: 'TCBUENPZ',
      description: 'TCBUEN - PATIOS ZAL'
    }, {
      code: 'SIMARITIMA',
      description: 'SIMARITIMA'
    }, {
      code: 'ZELSA',
      description: 'ZELSA'
    }, {
      code: 'PINTERMODAL',
      description: 'PATIO INTERMODAL'
    }, {
      code: 'ZONA FRANCA',
      description: 'ZONA FRANCA'
    }, {
      code: 'ZFspr',
      description: 'ZONA FRANCA SPRBUN'
    }, {
      code: 'ZFtcb',
      description: 'ZONA FRANCA TCBUEN'
    }, {
      code: 'ZFpcc',
      description: 'ZONA FRANCA PCC'
    }, {
      code: 'ZFsim',
      description: 'ZONA FRANCA SIMARITIMA'
    }, {
      code: 'ZFim',
      description: 'ZONA FRANCA INTERMODAL'
    }, {
      code: 'Colfpcc',
      description: 'COLFERCAR - PCC'
    }, {
      code: 'Colfsim',
      description: 'COLFERCAR - SIMARITIMA'
    }, {
      code: 'Colfspr',
      description: 'COLFERCAR - SPR'
    }, {
      code: 'Colftd',
      description: 'COLFERCAR - TRANSDEPORT'
    }, {
      code: 'Transdepot',
      description: 'TRANSDEPOT'
    }, {
      code: 'Transdcol',
      description: 'TRANSDEPORT - COLFECAR'
    }, {
      code: 'Transdsim',
      description: 'TRANSDEPORT - SIMARITIMA'
    }, {
      code: 'Transdtcb',
      description: 'TRANSDEPORT - TCBUEN'
    }, {
      code: 'Transdspr',
      description: 'TRANSDEPORT - SPR'
    }, {
      code: 'Transdpcc',
      description: 'TRANSDEPORT - PCC'
    }, {
      code: 'ZFtd',
      description: 'ZONA FRANCA TRANSDEPOT'
    }]);
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
