'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const salt = bcrypt.genSaltSync();
    await queryInterface.bulkInsert('users', [
      {
        name:'Administrador',
        phone:'3175555555',
        login:'admiinpiki',
        password: bcrypt.hashSync( '123456', salt ),
        identification:'8889999288',
        email:'adminpiki@gmail.com',
        companyId:1,
        roleId:1,
        type:1,
      },
      {
        name:'Sociedad de Comercialización Internacional de Azúcares y Mieles S.A.',
        phone:'2422272',
        login:'ciamsa',
        password: bcrypt.hashSync( 'ciamsa2014@', salt ),
        identification:'0000020773',
        email:'liliana.arboleda.bv@ciamsa.com',
        companyId:1,
        roleId:3,
        type:2
      },
      {
        name:'Yadira Riascos Montoya',
        phone:'3172195777',
        login:'yarimo',
        password: bcrypt.hashSync( 'yarimo@2015', salt ),
        identification:'1111747217',
        email:'yeye.121@hotmail.com',
        companyId:2,
        roleId:3,
        type:1
      },
      {
        name:'Julia Liceth Conde Erazo',
        phone:'3163674936',
        login:'jconde',
        password: bcrypt.hashSync( '@Colombia2015', salt ),
        identification:'1115080403',
        email:'julia.111@hotmail.com',
        companyId:5,
        roleId:3,
        type:1
      },
      {
        name:'Karol D. Muñoz Estupiñan',
        phone:'no posee',
        login:'kadaes',
        password: bcrypt.hashSync( 'karol@2015', salt ),
        identification:'1151946573',
        email:'no posee',
        companyId:2,
        roleId:3,
        type:1
      },
      {
        name:'Emmanuel Martelo',
        phone:'12345678',
        login:'emartelo',
        password: bcrypt.hashSync( '@Emmartelo2021', salt ),
        identification:'123456',
        email:'aemartelo@piki7.com.co',
        companyId:2,
        roleId:3,
        type:1
      },
      {
        name:'Davis Vanegas',
        phone:'2420551',
        login:'dajava',
        password: bcrypt.hashSync( '@dajava2015', salt ),
        identification:'14476581',
        email:'dajavan@gmail.com',
        companyId:3,
        roleId:3,
        type:1
      },
      {
        name:'Ivonne Bastidas',
        phone:'3182658073',
        login:'ivonne',
        password: bcrypt.hashSync( 'Ivonne@2015', salt ),
        identification:'38466566',
        email:'bastidas58@hotmail.com',
        companyId:2,
        roleId:3,
        type:1
      },
      {
        name:'Luz Nidya Rincon',
        phone:'3116025531',
        login:'luniri',
        password: bcrypt.hashSync( '@Nidya2022@', salt ),
        identification:'518965519',
        email:'zoloch.coordinacion@hotmail.com',
        companyId:4,
        roleId:2,
        type:1
      },
      {
        name:'Rodulfo Jose Verhelst Marrugo',
        phone:'2433515',
        login:'rodulf',
        password: bcrypt.hashSync( 'gerentepc2014@', salt ),
        identification:'73123466',
        email:'rodulfo.verhelst@patioscol.com, rodulfo.verhelst@ciatransportadora.com',
        companyId:5,
        roleId:3,
        type:1
      },
      {
        name:'C.I. Carbones Suramericanos S.A.',
        phone:'0918891775',
        login:'carsuramericanos',
        password: bcrypt.hashSync( 'carsuramerticanos2013', salt ),
        identification:'802.024.009-9',
        email:'admin@cisuramericanos.com',
        companyId:6,
        roleId:3,
        type:2
      },
      {
        name:'Carbones Andinos S A S',
        phone:'57 8 7372015',
        login:'carandinos',
        password: bcrypt.hashSync( 'carandinos2013', salt ),
        identification:'830.142.761-7',
        email:'info@carbonesandinos.com',
        companyId:7,
        roleId:3,
        type:2
      },
      {
        name:'Gerlein S.A. Eduardo L',
        phone:'3165217200',
        login:'gerleinco',
        password: bcrypt.hashSync( 'gerleinco2014@', salt ),
        identification:'860005101-9',
        email:'quejasyreclamos@gerlein.com.co, luis.suarez@geleinco.com',
        companyId:8,
        roleId:3,
        type:2
      },
      {
        name:'C.I. Bulk Trading Sur America LTDA',
        phone:'0918552950',
        login:'bulktrading',
        password: bcrypt.hashSync( 'bulktrading2013', salt ),
        identification:'8900.226.684-3',
        email:'admin@bulktrading.com',
        companyId:9,
        roleId:3,
        type:2
      },
      {
        name:'C.I. Trenaco',
        phone:'5712568757',
        login:'trenaco',
        password: bcrypt.hashSync( 'trenaco2013', salt ),
        identification:'900185261-4',
        email:'admin@trenaco.net',
        companyId:10,
        roleId:3,
        type:2
      },
      {
        name:'Comercializadora Colombiana de Carbones y Coques S.A. C.I.',
        phone:'57-1-5301053',
        login:'coquecol',
        password: bcrypt.hashSync( 'coquecol2013', salt ),
        identification:'900203461',
        email:'admin@coquecol.com',
        companyId:11,
        roleId:3,
        type:2
      },
    ], {});
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
