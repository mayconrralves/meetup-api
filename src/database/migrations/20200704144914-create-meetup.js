'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('meetups', {
       id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primarykey: true,
          autoIncrement: true, 
       },
       user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
       },
       banner_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: { model: 'files', key: 'id'},
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
       },
       description: {
          type: Sequelize.STRING,
          allowNull: false,
       },
       localization: {
          type: Sequelize.STRING,
          allowNull: false,
       },
       date: {
         type: Sequelize.DATE,
         allowNull: false,
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
    await queryInterface.dropTable('meetups');
  }
};
