

export function defineUserRole(sequelize, DataTypes) {
    const UserRole = sequelize.define("model_has_roles", {
        role_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        model_type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'App\\Models\\User'
        },
        model_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },

    }, {
        tableName: 'model_has_roles',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return UserRole;
}