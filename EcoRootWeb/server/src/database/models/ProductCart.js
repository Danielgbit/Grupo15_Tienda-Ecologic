module.exports = (sequelize, dataType) => {

    const alias = 'ProductCart';

    const cols = {
        product_cart_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        quantity: {
            type: dataType.INTEGER,
            allowNull: false
        },

        cart_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'cart',
                key: 'cart_id'
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
    };

    const config = {
        tableName: 'product_cart',
        timestamps: false
    };

    const ProductCart = sequelize.define(alias, cols, config);


    return ProductCart;

};