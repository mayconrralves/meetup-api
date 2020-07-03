'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.createTable('files', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        path: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
    });
  },

  down: async (queryInterface) => {
    queryInterface.dropTable('files');
  }
};
