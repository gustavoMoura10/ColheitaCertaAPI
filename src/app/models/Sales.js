const { Model, DataTypes } = require("sequelize");

class Sales extends Model {
  static init(sequelize) {
    super.init(
      {
        totalAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          field: "total_amount",
        },
        typePayment: {
          type: DataTypes.ENUM("DINHEIRO", "CARTAO_CREDITO", "CARTAO_ENTREGA"),
          allowNull: false,
          field: "type_payment",
        },
        payed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        comission: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("SOLICITADO", "APROVADO", "ENTREGUE"),
          allowNull: false,
        },
        insertionDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "insertion_date"
        },
        updated: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        requesterId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "requester_id",
        },
        stockId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "stocks",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "stock_id",
        },
      },
      {
        sequelize,
        tableName: "sales",
      }
    );
  }
  static associate({ Users, Stocks }) {
    this.belongsTo(Users, {
      as: "requester",
      foreignKey: "requester_id",
    });
    this.belongsTo(Stocks, {
      foreignKey: "stock_id",
      as: "stock",
    });
  }
}
module.exports = Sales;
