const { Model, DataTypes } = require("sequelize");

class Stocks extends Model {
  static init(sequelize) {
    super.init(
      {
        formOfSale: {
          type: DataTypes.ENUM("ATACADO", "VAREJO"),
          allowNull: false,
          field: "form_of_sale",
        },
        weight: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        typeWeight: {
          type: DataTypes.ENUM("KG", "HG", "DAG", "G", "DG", "CG", "MG"),
          allowNull: false,
          field: "type_weight",
        },
        description: {
          type: DataTypes.STRING(1500),
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        value: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expirationDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "expiration_date",
        },
        insertionDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "insertion_date",
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          unique: true,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "user_id",
        },
        formDeliver: {
          type: DataTypes.STRING(5000),
          allowNull: false,
          field: "form_deliver",
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "products",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "product_id",
        },
      },
      {
        sequelize,
        tableName: "stocks",
      }
    );
  }
  static associate({ Users, Products, Sales }) {
    this.belongsTo(Users, {
      as: "user",
      foreignKey: "user_id",
    });
    this.belongsTo(Products, {
      foreignKey: "product_id",
      as: "product",
    });
    this.hasMany(Sales, { foreignKey: "stock_id", as: "sales" });
  }
}
module.exports = Stocks;
