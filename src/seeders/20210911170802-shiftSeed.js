"use strict";

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
    await queryInterface.bulkInsert("shifts", [
      {
        date: "2021-03-12",
        clientId: 1,
        driverId: 338,
        transLineId: 11,
        userId: 9,
        shiftClassId: 1,
        containerYardId: 22,
        price: 20000,
        dayShift: 1,
        globalShift: 1,
        obvs: "",
        status: "true",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("shifts", null, {});
  },
};
