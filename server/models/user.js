const table = process.env.DB_TABLE;

const UserModel = (sequelize, DataTypes) => {
    const user = sequelize.define(table, {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        token: {
            type: DataTypes.STRING
        },
        admin: {
            type: DataTypes.BOOLEAN
        }
    });

    return user;
};

module.exports = UserModel;