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
      description:'Hamburg Sud',
      status: 'true'
    },{
      code:'Hll',
      description:'Hapagg LLoyd',
      status: 'true'
    },{
      code:'Kli',
      description:'Kline',
      status: 'true'
    },{
      code:'Hsud-Hll',
      description:'Hamburg Sud - Hapagg LLoyd',
      status: 'true'
    },{
      code:'Hsud-Kli',
      description:'Hamburg Sud - Kline',
      status: 'true'
    },{
      code:'HSBG',
      description:'Hamburg Sud - BULK GERLEINC',
      status: 'true'
    },{
      code:'Hll-Kli',
      description:'Hapagg LLoyd - Kline',
      status: 'true'
    },{
      code:'Otros',
      description:'Otros',
      status: 'true'
    },{
      code:'Stc',
      description:'Stol Colombia',
      status: 'true'
    },{
      code:'Bhg',
      description:'Bulk Haul _ Gerlein',
      status: 'true'
    },{
      code:'Cmacgm',
      description:'CMA _ CGM',
      status: 'true'
    },{
      code:'Cmacgmer',
      description:'CMA - CGM  / MAERKS',
      status: 'true'
    },{
      code:'Cmacgmham',
      description:'CMA - CGM / HAMBORD SUD',
      status: 'true'
    },{
      code:'Cmacgmkl',
      description:'CMA - CGM / K- LINE',
      status: 'true'
    },{
      code:'Cmacgmhll',
      description:'CMA - CGM / HAPALLOYD',
      status: 'true'
    },{
      code:'Maerks',
      description:'Maerks',
      status: 'true'
    },{
      code:'Maerkshs',
      description:'MAERKS - HAMBORD SUD',
      status: 'true'
    },{
      code:'Maerkshll',
      description:'MAERKS - HAPALLOYD',
      status: 'true'
    },{
      code:'Maerkskl',
      description:'MAERKS - K-LINE',
      status: 'true'
    },{
      code:'Yangm',
      description:'Yang Ming',
      status: 'true'
    },{
      code:'Yangm-Hll',
      description:'Yang Ming - Hapagg LLoyd',
      status: 'true'
    },{
      code:'Yangm-Hsud',
      description:'Yang Ming - Hamburg Sud',
      status: 'true'
    },{
      code:'Yangm-Kli',
      description:'Yang Ming - Kline',
      status: 'true'
    },{
      code:'Yangm-Sim',
      description:'Yang Ming - Simaritima',
      status: 'true'
    },{
      code:'Yangm-Cma',
      description:'Yang Ming - Cma Cgm',
      status: 'true'
    },{
      code:'Apl',
      description:'Apl',
      status: 'true'
    },{
      code:'Aplhs',
      description:'APL - HAMBORD SUD',
      status: 'true'
    },{
      code:'Aplkl',
      description:'APL - K- LINE',
      status: 'true'
    },{
      code:'Apl-Cma',
      description:'Apl - Cma Cgm',
      status: 'true'
    },{
      code:'Aplmer',
      description:'Apl- MAERKS',
      status: 'true'
    },{
      code:'Aplym',
      description:'Apl - Yang Ming',
      status: 'true'
    },{
      code:'MOL',
      description:'MOL',
      status: 'true'
    },{
      code:'MOLcgm',
      description:'MOL - CMA CGM',
      status: 'true'
    },{
      code:'MOLmer',
      description:'MOL - MAERSK',
      status: 'true'
    },{
      code:'MOLapl',
      description:'MOL - APL',
      status: 'true'
    },{
      code:'MOLym',
      description:'MOL - YANG MING',
      status: 'true'
    },{
      code:'MOLhs',
      description:'MOL - HAMBURG SUD',
      status: 'true'
    },{
      code:'MOLkl',
      description:'MOL - KLINE',
      status: 'true'
    },{
      code:'ONE',
      description:'ONE',
      status: 'true'
    },{
      code:'ONEhs',
      description:'ONE - HAMBURG SUD',
      status: 'true'
    },{
      code:'ONEbg',
      description:'ONE - BULK GERLEINC',
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
     await queryInterface.bulkDelete('transLines', null, {});
  }
};
