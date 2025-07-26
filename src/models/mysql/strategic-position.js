
export function defineStrategicPosition(sequelize, DataTypes) {
    const StrategicPosition = sequelize.define("strategic_positions", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        type_service: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        officer_change_cip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        officer_change_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        officer_change_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },{
        tableName: 'strategic_positions',
        timestamps: true,
        underscored: true, // usa snake_case en lugar de camelCase
    })

    return StrategicPosition;
}
