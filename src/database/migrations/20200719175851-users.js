'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('users');
  }
};
