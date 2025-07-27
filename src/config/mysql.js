import {Sequelize} from 'sequelize';
import {
    DATABASE_GEOLOCATION,
    USERNAME_GEOLOCATION,
    PASSWORD_GEOLOCATION,
    HOST_GEOLOCATION,
    PORT_GEOLOCATION,
} from '#utils';

export const sequelizeSocialEventGeo = new Sequelize(DATABASE_GEOLOCATION, USERNAME_GEOLOCATION, PASSWORD_GEOLOCATION, {
    host: HOST_GEOLOCATION,
    port: PORT_GEOLOCATION,
    dialect: 'mysql'
});

export const dbConnectMysqlSocialEventGeo = async () => {
    try {
        await sequelizeSocialEventGeo.authenticate();
        console.log('MYSQL GEOLOCATION Conexión correcta');
    } catch (e) {
        console.log("MYSQL GEOLOCATION Error de conexión: ", e.message)
    }
}




