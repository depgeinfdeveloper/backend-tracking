import db from "#models";
import {jwt} from '#utils';
import {findUserByCip, validateCipWithMaspol, createUserFromMaspol, validateUserToken} from '#services';

const {User} = db;

const login = async (req, res) => {
    const {user_cip, user_token} = req.body;
    console.log(req.body)
    try {
        let user = await findUserByCip(user_cip);
        if (!user) {
            const cipResponse = await validateCipWithMaspol(user_cip);
            if (cipResponse.stateResponse === "1") {
                return res.status(403).json({
                    success: false,
                    message: 'El CIP no es válido',
                });
            }

            const maspolData = cipResponse.data;
            user = await createUserFromMaspol(maspolData[0]);
        }

        try {

            const tokenResponse = await validateUserToken(user_cip, user_token);
            if (!tokenResponse.valid) {
                return res.status(401).json({
                    success: false,
                    message: tokenResponse.message,
                    error: tokenResponse.message
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


        } catch (tokenError) {
            return res.status(502).json({
                success: false,
                message: 'Error consultando el token en la API externa',
                error: tokenError.message,
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({success: false, message: 'Error de servidor', error: e});
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
}
