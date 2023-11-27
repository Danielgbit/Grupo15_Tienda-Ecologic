module.exports = (sequelize, dataType) => {

    const alias = 'Order';

    const cols = {
        order_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        order_date: {
            type: dataType.DATE,
            allowNull: false
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
        tableName: 'orders',
        timestamps: false
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
        
        Order.belongsToMany(models.Product, {
            through: 'OrderProduct', // Nombre de la tabla de unión
            foreignKey: 'order_id',
            otherKey: 'product_id',
            as: 'products', // Alias para la relación
          });

        Order.belongsTo(models.User, {
            as: 'userOrder',
            timestamps: false,
            foreignKey: 'user_id'
        });
    };

    return Order;

};