module.exports = (sequelize, dataType) => {

    const alias = 'Product';

    const cols = {
        product_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true            
        },
        
        name: {
            type: dataType.STRING,
            allowNull: false
        },
        
        description: {
            type: dataType.STRING,
            allowNull: false
        },

        price: {
            type: dataType.DECIMAL(10, 2),
            allowNull: false
        },

        united: {
            type: dataType.INTEGER,
            allowNull: false
        },

        discount: {
            type: dataType.DECIMAL(4, 2),
            allowNull: true
        },

        material : {
            type: dataType.STRING,
            allowNull: false
        },

        state: {
            type: dataType.ENUM('New', 'Used'),
            allowNull: false
        },

        image: {
            type: dataType.STRING,
            allowNull: false
        },

        color: {
            type: dataType.STRING,
            allowNull: true
        },

        user_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },

        category_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'category_id'
            }
        }
    };

    const config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.User, {
            as: 'userProduct',
            timestamps: false,
            foreignKey: 'user_id'
        });

        Product.belongsTo(models.Category, {
            as: 'productCategory',
            timestamps: false,
            foreignKey: 'category_id'
        });

        Product.hasMany(models.Order, {
            as: 'ProductOrder',
            timestamps: false,
            foreignKey: 'product_id'
        });

        Product.belongsToMany(models.Cart, {
            as: 'cartProducts',
            foreignKey: 'product_id',
            through: 'ProductCart',
            timestamps: false
        });
    };

    return Product;

};


