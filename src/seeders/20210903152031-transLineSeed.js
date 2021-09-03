'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name:'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    await queryInterface.bulkInsert('transLines', [{
      code:'Hsud',
      description:'Hamburg Sud'
    },{
      code:'Hll',
      description:'Hapagg LLoyd'
    },{
      code:'Kli',
      description:'Kline'
    },{
      code:'Hsud-Hll',
      description:'Hamburg Sud - Hapagg LLoyd'
    },{
      code:'Hsud-Kli',
      description:'Hamburg Sud - Kline'
    },{
      code:'HSBG',
      description:'Hamburg Sud - BULK GERLEINC'
    },{
      code:'Hll-Kli',
      description:'Hapagg LLoyd - Kline'
    },{
      code:'Otros',
      description:'Otros'
    },{
      code:'Stc',
      description:'Stol Colombia'
    },{
      code:'Bhg',
      description:'Bulk Haul _ Gerlein'
    },{
      code:'Cmacgm',
      description:'CMA _ CGM'
    },{
      code:'Cmacgmer',
      description:'CMA - CGM  / MAERKS'
    },{
      code:'Cmacgmham',
      description:'CMA - CGM / HAMBORD SUD'
    },{
      code:'Cmacgmkl',
      description:'CMA - CGM / K- LINE'
    },{
      code:'Cmacgmhll',
      description:'CMA - CGM / HAPALLOYD'
    },{
      code:'Maerks',
      description:'Maerks'
    },{
      code:'Maerkshs',
      description:'MAERKS - HAMBORD SUD'
    },{
      code:'Maerkshll',
      description:'MAERKS - HAPALLOYD'
    },{
      code:'Maerkskl',
      description:'MAERKS - K-LINE'
    },{
      code:'Yangm',
      description:'Yang Ming'
    },{
      code:'Yangm-Hll',
      description:'Yang Ming - Hapagg LLoyd'
    },{
      code:'Yangm-Hsud',
      description:'Yang Ming - Hamburg Sud'
    },{
      code:'Yangm-Kli',
      description:'Yang Ming - Kline'
    },{
      code:'Yangm-Sim',
      description:'Yang Ming - Simaritima'
    },{
      code:'Yangm-Cma',
      description:'Yang Ming - Cma Cgm'
    },{
      code:'Apl',
      description:'Apl'
    },{
      code:'Aplhs',
      description:'APL - HAMBORD SUD'
    },{
      code:'Aplkl',
      description:'APL - K- LINE'
    },{
      code:'Apl-Cma',
      description:'Apl - Cma Cgm'
    },{
      code:'Aplmer',
      description:'Apl- MAERKS'
    },{
      code:'Aplym',
      description:'Apl - Yang Ming'
    },{
      code:'MOL',
      description:'MOL'
    },{
      code:'MOLcgm',
      description:'MOL - CMA CGM'
    },{
      code:'MOLmer',
      description:'MOL - MAERSK'
    },{
      code:'MOLapl',
      description:'MOL - APL'
    },{
      code:'MOLym',
      description:'MOL - YANG MING'
    },{
      code:'MOLhs',
      description:'MOL - HAMBURG SUD'
    },{
      code:'MOLkl',
      description:'MOL - KLINE'
    },{
      code:'ONE',
      description:'ONE'
    },{
      code:'ONEhs',
      description:'ONE - HAMBURG SUD'
    },{
      code:'ONEbg',
      description:'ONE - BULK GERLEINC'
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
