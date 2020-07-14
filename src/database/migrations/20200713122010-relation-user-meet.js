'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('user_meets', {
      id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_meets_id: {
      type: Sequelize.INTEGER,
      references: { model: 'meetups', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
     fk_users_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    }
  });

  },

  down: async (queryInterface) => {
    
      await queryInterface.dropTable('user_meets');
     
  }
};
