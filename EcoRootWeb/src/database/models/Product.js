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
            type: dataType.INTEGER
        },

        category_id: {
            type: dataType.INTEGER
        }
    };

    const config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    return Product;

};


