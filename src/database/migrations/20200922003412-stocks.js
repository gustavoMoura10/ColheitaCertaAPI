"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("stocks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      formOfSale: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "form_of_sale",
      },
      weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      typeWeight: {
        type: Sequelize.ENUM("KG", "HG", "DAG", "G", "DG", "CG", "MG"),
        allowNull: false,
        field: "type_weight",
      },
      description: {
        type: Sequelize.STRING(1500),
      },
      value: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        type: Sequelize.STRING(5000),
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "expiration_date",
      },
      insertionDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "insertion_date",
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "user_id",
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "product_id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("stocks");
  },
};
