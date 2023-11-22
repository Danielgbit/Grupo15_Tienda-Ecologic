module.exports = (sequelize, DataTypes) => {

    const alias = 'QuantityProductCategory';

    const cols = {

        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'categories', // Asegúrate de que coincida con el nombre de tu tabla de categorías
                key: 'category_id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    };

    const config = {
        tableName: 'quantity_productcategory',
        timestamps: false
    };

    const QuantityProductCategory = sequelize.define(alias, cols, config);

    QuantityProductCategory.associate = (models) => {

        QuantityProductCategory.belongsTo(models.Category, {
            foreignKey: 'category_id',
            targetKey: 'category_id',
            timestamps: false
        });
    };

    return QuantityProductCategory;
};
