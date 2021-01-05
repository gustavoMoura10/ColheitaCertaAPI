'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return await queryInterface.createTable('locations', {
      id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      zipCode: {
        type:Sequelize.STRING(50),
        field:'zip_code'
      },
      publicPlace: {
        type:Sequelize.STRING(100),
        allowNull:false,
        field:'public_place'
      },
      number: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      complement: {
        type:Sequelize.STRING(50)
      },
      neighborhood: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      state: {
        type: Sequelize.STRING(5),
        allowNull:false
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        },
        unique:true,
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        field:'user_id'
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('locations');
  }
};
