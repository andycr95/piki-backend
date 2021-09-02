'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('asignContainerShifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      containerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'containers',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      shiftId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shitfs',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('asignContainerShifts');
  }
};