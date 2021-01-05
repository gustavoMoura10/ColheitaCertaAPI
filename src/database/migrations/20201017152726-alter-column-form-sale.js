"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    return await Promise.all([
      queryInterface.changeColumn(
        "stocks",
        "form_of_sale",
        {
          type: Sequelize.ENUM("ATACADO", "VAREJO"),
          allowNull: false,
        },
        {
          transaction,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
     return await Promise.all([
      queryInterface.changeColumn(
        "stocks",
        "form_of_sale",
        {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        {
          transaction,
        }
      ),
    ]);
  },
};
