module.exports = (sequelize, dataType) => {

    const alias = 'Order';

    const cols = {
        order_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },


        cuantity: {
            type: dataType.INTEGER,
            allowNull: false
        },

        order_date: {
            type: dataType.DATE,
            allowNull: false
        },

        product_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'product_id'
            }
        },

        user_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        }
    };

    const config = {
        tableName: 'Orders',
        timestamps: false
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
        
        Order.hasMany(models.Product, {
            as: 'ProductOrder',
            timestamps: false,
            foreignKey: 'product_id'
        });

        Order.belongsTo(models.User, {
            as: 'userOrder',
            timestamps: false,
            foreignKey: 'user_id'
        });
    };

    return Order;

};