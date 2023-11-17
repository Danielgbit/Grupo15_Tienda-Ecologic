module.exports = (sequelize, dataType) => {

    const alias = 'Brand';

    const cols = {

        brand_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },

        brand_name: {
            type: dataType.STRING,
            allowNull: false
        }

    };

    const config = {
        tableName: 'brands',
        timestamps: false
    };

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = (models) => {

        Brand.belongsToMany(models.Category, {
            as: 'category',
            foreignKey: 'brand_id',
            through: 'BrandCategory',
            timestamps: false
        });

        Brand.hasMany(models.Product, { // Nueva relacion que faltaba
            as: 'productBrand',
            timestamps: false,
            foreignKey: 'brand_id'
        });
    };

    return Brand; 

};

