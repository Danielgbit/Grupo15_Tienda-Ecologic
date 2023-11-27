module.exports = (sequelize, dataType) => {

    const alias = 'ProductColor';

    const cols = {

        product_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'product_id'
            },
        },

        color_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'colors',
                key: 'color_id'
            },
        }
    };

    const config = {
        tableName: 'product_color',
        timestamps: false
    };

    const ProductColor = sequelize.define(alias, cols, config);


    return ProductColor;

};