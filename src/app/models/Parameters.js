const { Model, DataTypes } = require("sequelize");
class Parameters extends Model {
  static init(sequelize) {
    super.init(
      {
        key: {
          type: DataTypes.STRING(1500),
          allowNull: false,
        },
        value: {
          type: DataTypes.STRING(1500),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "parameters",
      }
    );
  }
}

module.exports = Parameters;
