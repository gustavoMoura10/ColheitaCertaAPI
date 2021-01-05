const { Model, DataTypes } = require('sequelize')

class Locations extends Model {
    static init(sequelize) {
        super.init({
            zipCode: {
                type: DataTypes.STRING(50),
                field: 'zip_code'
            },
            publicPlace: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: 'public_place'
            },
            number: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            complement: {
                type: DataTypes.STRING(50)
            },
            neighborhood: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            state: {
                type: DataTypes.STRING(5),
                allowNull: false
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                unique: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                field: 'user_id'
            }
        }, {
            sequelize,
            tableName: 'locations'
        });
    }
    static associate({ Users }) {
        this.belongsTo(Users, {
            as: 'user',
            foreignKey: 'user_id',
            as: 'user'
        })
    }
}
module.exports = Locations;