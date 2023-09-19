module.exports = (sequelize, dataType) => {

    const alias = 'Order';

    const cols = {
        order_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },

        user_id: {
            type: dataType.INTEGER,
            allowNull: false
        },

        product_id: {
            type: dataType.INTEGER,
            allowNull: false
        },

        cuantity: {
            type: dataType.INTEGER,
            allowNull: false
        },

        order_date: {
            type: dataType.DATE,
            allowNull: false
        }
    };

    const config = {
        tableName: 'Orders',
        timestamps: false
    };

    const Order = sequelize.define(alias, cols, config);

    return Order;

};

