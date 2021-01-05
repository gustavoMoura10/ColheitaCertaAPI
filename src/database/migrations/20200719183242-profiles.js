'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return await queryInterface.createTable('profiles', {
      id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      firstName: {
        type:Sequelize.STRING(50),
        allowNull:false,
        field:'first_name'
      },
      lastName: {
        type:Sequelize.STRING(50),
        allowNull:false,
        field:'last_name'
      },
      birthdate: {
        type:Sequelize.DATE,
        allowNull:false
      },
      documentType: {
        type: Sequelize.ENUM('CPF', 'CNPJ'),
        allowNull:false,
        field:'document_type'
      },
      document: {
        type: Sequelize.STRING,
        allowNull:false
      },
      sex: {
        type: Sequelize.ENUM('M', 'F', 'U'),
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
    return await queryInterface.dropTable('profiles');
  }
};
