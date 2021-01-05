'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('profiles', 'sex', {
      type: Sequelize.ENUM('M', 'F', 'O'),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('profiles', 'sex', {
      type: Sequelize.ENUM('M', 'F', 'U'),
      allowNull: false
    });
  }
};
