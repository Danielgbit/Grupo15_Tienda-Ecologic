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

    return Brand; 

};

