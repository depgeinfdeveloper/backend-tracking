import { DataTypes } from 'sequelize';
import { sequelizeSocialEventGeo } from '#config';
import { defineUser } from './user.js';
import { defineRole } from './role.js';
import { defineStrategicPosition } from './strategic-position.js';
import { defineStrategicPositionUser } from './strategic-position-user.js';
import { defineUserRole } from './user-role.js';

const db = {};

// Definir modelos
db.User = defineUser(sequelizeSocialEventGeo, DataTypes);
db.Role = defineRole(sequelizeSocialEventGeo, DataTypes);
db.StrategicPosition = defineStrategicPosition(sequelizeSocialEventGeo, DataTypes);
db.StrategicPositionUser = defineStrategicPositionUser(sequelizeSocialEventGeo, DataTypes);
db.UserRole = defineUserRole(sequelizeSocialEventGeo, DataTypes);

// Asociaciones
db.User.belongsToMany(db.Role, {
    through: {
        model: 'model_has_roles',
        unique: false,
        scope: {
            model_type: 'App\\Models\\User',
        },
    },
    foreignKey: 'model_id',
    otherKey: 'role_id',
    constraints: false,
    as: 'roles',
    timestamps: false
});

db.Role.belongsToMany(db.User, {
    through: {
        model: 'model_has_roles',
        unique: false,
        scope: {
            model_type: 'App\\Models\\User',
        },
    },
    foreignKey: 'role_id',
    otherKey: 'model_id',
    as: 'users',
    timestamps: false
});

db.StrategicPositionUser.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user',
});
db.StrategicPositionUser.belongsTo(db.StrategicPosition, {
    foreignKey: 'strategic_position_id',
    as: 'strategic_position',
});

db.sequelize = sequelizeSocialEventGeo;

export default db;