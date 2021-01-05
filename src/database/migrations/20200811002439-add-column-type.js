'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('users', 'type', {
          type: Sequelize.ENUM("CLIENTE","PRODUTOR"),
          allowNull: false
        }, { transaction: t }),
       
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'type', { transaction: t }),
      ]);
    });
  }
};
