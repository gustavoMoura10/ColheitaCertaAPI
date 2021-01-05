const { Model, DataTypes } = require('sequelize')

class Profiles extends Model {
    static init(sequelize) {
        super.init({
            firstName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: 'first_name'
            },
            lastName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: 'last_name'
            },
            birthdate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            documentType: {
                type: DataTypes.ENUM('CPF', 'CNPJ'),
                allowNull: false,
                field: 'document_type'
            },
            document: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            profilePicture: {
                type: DataTypes.STRING(5000),
                allowNull: false,
                field: 'profile_picture'
            },
            sex: {
                type: DataTypes.ENUM('M', 'F', 'O'),
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
            },
        }, {
            sequelize,
            tableName: 'profiles'
        });
    }
    static associate({ Users }) {
        this.belongsTo(Users, {
            as: 'user',
            foreignKey: 'user_id',

        })
    }
}
module.exports = Profiles;