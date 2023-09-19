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
        }
    };

    const config = {
        tableName: 'categories',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    return Category;

};

