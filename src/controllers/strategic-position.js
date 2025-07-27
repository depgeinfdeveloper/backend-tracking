import {
    findStrategicPositionByCip,
    findStrategicPositionByType, findStrategicPositionByUserId,
    getAllStrategicPosition,
    getUsersFromStrategicPosition, registerStrategicPositionUser
} from "#services";



async function byCip(req, res) {

    const {number_cip_code} = req.body;
    console.log(number_cip_code)
    try{
        if (!number_cip_code) {
            return res.status(400).json({
                success: false,
                message: 'Campos inválidos',
            });
        }

        const data = await findStrategicPositionByCip(number_cip_code);


        return res.status(200).json({
            success: true,
            message: 'Puestos para oficiales de control',
            data: data
        });

    }catch (error){
        return res.status(500).json({success: false, message: 'Error de servidor', error: error});
    }
}

async function byUserId(req, res) {

    const {user_id} = req.body;
    console.log(user_id)
    try{
        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'Campos inválidos',
            });
        }

        const data = await findStrategicPositionByUserId(user_id);


        return res.status(200).json({
            success: true,
            message: 'Puestos por Usuario',
            data: data
        });

    }catch (error){
        return res.status(500).json({success: false, message: 'Error de servidor', error: error});
    }
}


async function getUsers(req, res) {

    const {strategic_position_id} = req.body;
    console.log(strategic_position_id)
    try{
        if (!strategic_position_id) {
            return res.status(400).json({
                success: false,
                message: 'Campos inválidos',
            });
        }

        const data = await getUsersFromStrategicPosition(strategic_position_id);


        return res.status(200).json({
            success: true,
            message: 'Usuarios asociados al punto estrategico',
            data: data
        });
    }catch (error){
        console.log(error)
        return res.status(500).json({success: false, message: 'Error de servidor', error: error});
    }
}

async function getAll(req, res) {

    try{
        const data = await getAllStrategicPosition();
        return res.status(200).json({
            success: true,
            message: 'Puntos Estratégicos',
            data: data
        });

    }catch (error){
        console.log(error)
        return res.status(500).json({success: false, message: 'Error de servidor', error: error});
    }

}

async function byType(req, res) {
    const {type_service} = req.body;
    try{
        const data = await findStrategicPositionByType(type_service);
        return res.status(200).json({
            success: true,
            message: 'Puntos Estratégicos',
            data: data
        });

    }catch (error){
        console.log(error)
        return res.status(500).json({success: false, message: 'Error de servidor', error: error});
    }

}

async function register(req, res) {
    const {strategic_position_id, user_id} = req.body;
    try{
        console.log(user_id);
        const data = await registerStrategicPositionUser(strategic_position_id, user_id);
        return res.status(200).json({
            success: true,
            message: 'Puntos Estratégicos',
            data: data
        });

    }catch (error){
        if (error.status === 409) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({success: false, message: 'Error de servidor', error: error});
    }

}




export const StrategicPositionController = {
    byCip,
    byUserId,
    byType,
    getUsers,
    getAll,
    register
}