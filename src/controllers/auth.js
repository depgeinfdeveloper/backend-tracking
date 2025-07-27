import db from "#models";
import {jwt} from '#utils';
import {findUserByCip, validateCipWithMaspol, createUserFromMaspol, validateUserToken} from '#services';

const {User} = db;

const login = async (req, res) => {
    const {user_cip, user_pin} = req.body;
    console.log(user_cip);
    console.log(user_pin)
    try {
        let user = await findUserByCip(user_cip);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'El usuario no existe o no ha activado su cuenta',
                error: 'El usuario no existe o no ha activado su cuenta'
            });
        }

        ///


        const matched = await user.comparePassword(user_pin);
        if (!matched) return res.status(403).send({success: false, message: 'Credenciales incorrectas', error: "Credenciales incorrectas"});


        const newAccessToken = await jwt.createAccessToken(user)
        const newRefreshToken = await jwt.createRefreshToken(user)

        return res.status(200).json({
            success: true,
            message: 'Credenciales correctas',
            data: {
                access: newAccessToken,
                refresh: newRefreshToken,
                user: user
            }
        });


    } catch (e) {
        console.log(e);
        return res.status(500).json({success: false, message: 'Error de servidor', error: e});
    }

}

const register = async (req, res) => {
    const data = req.body;
    console.log("Datos a registrar:", data);
    try {

        await createUserFromMaspol(data);
        return res.status(200).json({
            success: true,
            message: 'El usuario ha sido creado exitosamente.',
            data: data
        });

    } catch (error) {
        if (error.status === 409) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }
        console.log(error);
        return res.status(500).json({success: false, message: 'Error de servidor al crear usuarios', error: error});
    }
}


const refreshAccessToken = async (refreshToken) => {
    const {user_id} = jwt.decoded(refreshToken);
    const user = await User.findOne({
        where: {
            idusuarios: user_id
        },
        attributes: ['idusuarios', 'nombre', 'usuario_nivel', 'usu_pin', 'usuario_clave', 'token']
    });
    return await jwt.createAccessToken(user)
}

export const AuthController = {
    login,
    register
}
