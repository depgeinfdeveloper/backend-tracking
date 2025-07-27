import {DataTypes} from "sequelize";

export function defineUser(sequelize, DataTypes) {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        number_cip_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number_phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        remember_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email_verified_at: {
            type: DataTypes.DATE,
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
        tableName: 'users',
        timestamps: true,
        paranoid: true
    });

    User.prototype.comparePassword = function (passwordEntry) {
        return this.password == passwordEntry
    }


    User.prototype.toJSON = function () {
        let values = Object.assign({}, this.get());
        delete values.password;
        return values;
    };

    return User;
}
