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

        Category.belongsToMany(models.Brand, {
            as: 'brand',
            foreignKey: 'category_id',
            through: 'BrandCategory',
            timestamps: false
        });
    };

    return Category;

};