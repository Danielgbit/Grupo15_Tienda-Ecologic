module.exports = (sequelize, dataType) => {

    const alias = 'Category';

    const cols = {
        category_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        category_name: {
            type: dataType.ENUM('Cuidado personal', 'Moda', 'Hogar', 'Joyería'),
            allowNull: false
        },

        image: {
            type: dataType.STRING,
        }
    };

    const config = {
        tableName: 'categories',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        
        Category.hasMany(models.Product, {
            as: 'productCategory',
            timestamps: false,
            foreignKey: 'category_id'
        });


        Category.belongsToMany(models.Product, {
            as: 'categoryProducts',
            through: 'ProductCategory',
            foreignKey: 'category_id',
            otherKey: 'product_id',
            timestamps: false
          });

        Category.hasOne(models.QuantityProductCategory, {
            as: 'quantityProducts',
            foreignKey: 'category_id',
            sourceKey: 'category_id',
            timestamps: false
        });
    };

    return Category;

};