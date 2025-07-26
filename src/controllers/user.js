import {findUserById, updateUser} from "#services";

async function getMe(req, res) {
    const { user_id } = req.user;
    console.log(req.user);
    try{
        let user = await findUserById(user_id);
        if (!user) return res.status(404).send({ error: "No se ha encontrado el usuario"})
        return res.status(200).json({
            success: true,
            message: 'Credenciales correctas',
            data: user
        });

    }catch (error){
        return res.status(500).json({success: false, message: 'Error de servidor', error: e});
    }
}


async function update(req, res) {
    const { user_id } = req.user;
    const {number_phone, email} = req.body;
    try{
        if (!number_phone || !email) {
            return res.status(400).json({
                success: false,
                message: 'Campos inválidos',
            });
        }
        const data = {number_phone, email};
        let user = await updateUser(user_id, data);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado o sin cambios',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Credenciales correctas',
            data: user
        });
    }catch (error){
        return res.status(500).json({success: false, message: 'Error de servidor', error: e});
    }
}

export const UserController = {
    getMe,
    update
};
