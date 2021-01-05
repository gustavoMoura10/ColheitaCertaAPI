const { Model, DataTypes } = require('sequelize')

class Products extends Model {
    static init(sequelize) {
        super.init({
            name:{
                type:DataTypes.STRING(500),
                unique:true,
                notNull:true
              }
        }, {
            sequelize,
            tableName: 'products'
        });
    }
    static associate({ Stocks }) {
        this.hasMany(Stocks, { foreignKey: 'product_id', as: 'stocks' });

    }
}
module.exports = Products;