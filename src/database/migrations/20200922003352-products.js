'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('products', {
      id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING(500),
        unique:true,
        notNull:true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('products')
  }
};
