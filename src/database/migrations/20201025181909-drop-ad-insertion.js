"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("sales", "inserted", { transaction: t }),
        queryInterface.addColumn(
          "sales",
          "insertion_date",
          {
            type: Sequelize.DATE,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("sales", "inserted", { transaction: t }),
      ]);
    });
  },
};
