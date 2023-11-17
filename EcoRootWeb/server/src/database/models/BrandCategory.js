module.exports = (sequelize, dataType) => {

    const alias = 'BrandCategory';

    const cols = {

        brand_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'brands',
                key: 'brand_id'
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
    };

    const config = {
        tableName: 'brand_category',
        timestamps: false
    };

    const BrandCategory = sequelize.define(alias, cols, config);


    return BrandCategory;

};