module.exports = (sequelize, dataType) => {

    const alias = 'Cart';

    const cols = {

        cart_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        tableName: 'cart',
        timestamps: false
    };

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = (models) => {

        Cart.belongsTo(models.User, {
            as: 'cartUser',
            timestamps: false,
            foreignKey: 'user_id'
        });

        Cart.belongsToMany(models.Product, {
            as: 'cartProducts',
            foreignKey: 'cart_id',
            through: 'ProductCart',
            timestamps: false
        });
    };

    return Cart;

};