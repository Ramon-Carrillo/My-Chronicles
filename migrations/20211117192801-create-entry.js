'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      wins: {
        type: Sequelize.TEXT,
      },
      allies: {
        type: Sequelize.TEXT,
      },
      growth: {
        type: Sequelize.TEXT,
      },
      grateful: {
        type: Sequelize.TEXT,
      },
      threats: {
        type: Sequelize.TEXT,
      },
      todos: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('entries');
  },
};
