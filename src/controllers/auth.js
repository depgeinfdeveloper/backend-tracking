import db from "#models";
import { jwt } from '#utils';
import { findUserByCip, validateCipWithMaspol, createUserFromMaspol, validateUserToken } from '#services';

const { User } = db;


const verifyUser = async (req, res) => {
    const { user_cip } = req.body;
    try {
        let user = await findUserByCip(user_cip);
        console.log("user", user);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "usuario no existe en el sistema",
                error: 'user not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'El usuario si existe en el sistema',
            data: true
        });


    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Error al verificar usuario en el sistema',
            error: e.message,
        });
    }
}

const registerUser = async (req, res) => {
    const data = req.body;
    console.log("Datos a registrar:", data);
    try {

        await createUserFromMaspol(data);
        return res.status(200).json({
            success: true,
            message: 'El usuario ha sido creado exitosamente',
            data: data
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: 'Error de servidor al crear usuarios', error: e });
    }
}

const login = async (req, res) => {
    const { user_cip } = req.body;

    try {
        let user = await findUserByCip(user_cip);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "El usuario no ha activado su cuenta",
                error: 'user not found'
            });
        }

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
        return res.status(500).json({ success: false, message: 'Error de servidor', error: e });
    }

}


const refreshAccessToken = async (refreshToken) => {
    const { user_id } = jwt.decoded(refreshToken);
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
    verifyUser,
    registerUser,
}
