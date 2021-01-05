"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    return await Promise.all([
      queryInterface.changeColumn(
        "sales",
        "status",
        {
          type: Sequelize.ENUM("SOLICITADO", "APROVADO", "ENTREGUE"),
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
        "sales",
        "status",
        {
          type: Sequelize.ENUM("SOLICITADO", "APROVADO"),
          allowNull: false,
        },
        {
          transaction,
        }
      ),
    ]);
  },
};
