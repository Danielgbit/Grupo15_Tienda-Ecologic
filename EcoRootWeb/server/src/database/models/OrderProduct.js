module.exports = (sequelize, dataType) => {

    const alias = 'OrderProduct';

    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        order_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'order_id'
            }
        },

        product_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'product_id'
            }
        },

        quantity: {
            type: dataType.INTEGER,
            allowNull: false
        }
    };

    const config = {
        tableName: 'order_product',
        timestamps: false
    };

    const OrderProduct = sequelize.define(alias, cols, config);

    return OrderProduct;

};