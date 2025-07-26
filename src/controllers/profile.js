import db from "#models";
import {findUserById} from "#services";

const {User} = db;

const showProfile = async (req, res) => {
    const { user_id } = req.user;
    try {
        let user = await findUserById(user_id);
        if (!user) return res.status(404).send({success: false, message: 'El usuario no existe', error: ''})

        return res.status(200).json({
            success: true,
            message: 'Perfil del usuario',
            data: user
        });

    }catch (e) {
        return res.status(500).json({success: false, message: 'Error de servidor', error: e});
    }

}

export const ProfileController = {
    showProfile
}
