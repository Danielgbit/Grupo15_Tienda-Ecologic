module.exports = (sequelize, dataType) => {

    const alias = 'Color';

    const cols = {
        color_id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true         
        },

        color_name: {
            type: dataType.STRING,
            allowNull: false
        },

        hex_code: {
            type: dataType.STRING,
            allowNull: false
        }
    };

    const config = {
        tableName: 'colors',
        timestamps: false
    };

    const Color = sequelize.define(alias, cols, config);

    return Color; 

};

