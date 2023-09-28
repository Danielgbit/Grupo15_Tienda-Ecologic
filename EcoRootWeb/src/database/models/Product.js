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

        color_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'colors',
                key: 'color_id'
            }
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
        },

        brand_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'brands',
                key: 'brand_id'
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
            as: 'productOrder',
            timestamps: false,
            foreignKey: 'product_id'
        });

        Product.belongsToMany(models.Cart, {
            as: 'cartProducts',
            foreignKey: 'product_id',
            through: 'ProductCart',
            timestamps: false
        });

        Product.hasMany(models.Color, {
            as: 'colorProduct',
            timestamps: false,
            foreignKey: 'color_id'
        })

        Product.belongsToMany(models.Color, {
            as: 'colors',
            foreignKey: 'product_id',
            through: 'ProductColor',
            timestamps: false
        });

        Product.belongsTo(models.Brand, { // Nueva relacion que faltaba
            as: 'productBrand',
            timestamps: false,
            foreignKey: 'brand_id'
        });
    };

    return Product;

};


