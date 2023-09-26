module.exports = (sequelize, dataType) => {

    const alias = 'User';

    const cols = {
        user_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true         
        },

        first_name: {
            type: dataType.STRING,
            allowNull: false
        },

        last_name: {
            type: dataType.STRING,
            allowNull: false
        },
 
        username: {
            type: dataType.STRING,
            allowNull: false
        },

        email: {
            type: dataType.STRING,
            allowNull: false
        },

        password: {
            type: dataType.STRING,
            allowNull: false
        },

        avatar: {
            type: dataType.STRING,
            allowNull: false
        },

        country: {
            type: dataType.STRING,
            allowNull: false
        },

        city: {
            type: dataType.STRING,
            allowNull: false
        },

        address: {
            type: dataType.STRING,
            allowNull: false
        },

        birthDate: {
            type: dataType.DATE,
            allowNull: false
        },

        gender: {
            type: dataType.ENUM('female', 'male', 'other'),
            allowNull: false
        }
    };

    const config = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {

        User.hasMany(models.Product, {
            as: 'userProduct',
            timestamps: false,
            foreignKey: 'user_id'
        });

        
        User.hasMany(models.Order, {
            as: 'userOrder',
            timestamps: false,
            foreignKey: 'user_id'
        });

        User.belongsTo(models.Cart, {
            as: 'cartUser',
            timestamps: false,
            foreignKey: 'user_id'
        });
    };

    return User;

};