

export function defineStrategicPositionUser(sequelize, DataTypes) {
    const StrategicPositionUser = sequelize.define('strategic_position_users', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        strategic_position_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        }
    }, {
        tableName: 'strategic_position_users',
        timestamps: true,
        underscored: true,
    });

    return StrategicPositionUser;
}