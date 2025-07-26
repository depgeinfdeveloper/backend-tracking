
export function defineRole(sequelize, DataTypes) {
    const Role = sequelize.define("roles", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guard_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at',
        },
    }, {
        tableName: 'roles',
        timestamps: true,
        paranoid: true,
        underscored: true,
    });

    return Role;
}
