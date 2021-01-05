const { Model, DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");
class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("CLIENTE", "PRODUTOR"),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }
  static associate({ Profiles, Locations, Stocks, Sales }) {
    this.hasOne(Profiles, { foreignKey: "user_id", as: "profile" });
    this.hasOne(Locations, { foreignKey: "user_id", as: "location" });
    this.hasMany(Stocks, { foreignKey: "user_id", as: "stocks" });
    this.hasMany(Sales, { foreignKey: "requester_id", as: "sales" });
  }
  static hooks() {
    this.addHook("beforeCreate", async function (user) {
      const salt = bcryptjs.genSaltSync(10);
      user.password = bcryptjs.hashSync(user.password, salt);
    });
  }
}

module.exports = Users;
