import db from '#models'; // si tienes un alias
const  {StrategicPosition, StrategicPositionUser, User} = db;

export async function findStrategicPositionByCip(number_cip_code){
    return await StrategicPosition.findAll({
        where: {officer_change_cip: number_cip_code},
        attributes: [
            'id', 'name', 'officer_change_cip', 'officer_change_name', 'officer_change_phone'
        ]
    })
}

export async function getUsersFromStrategicPosition(strategic_id){
    return await StrategicPositionUser.findAll({
        where: {strategic_position_id: strategic_id},
        attributes: ['id', 'strategic_position_id', 'user_id'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'number_cip_code', 'firstname', 'lastname', 'grade', 'number_phone', 'gender'],
            }
        ]
    })
}

export async function findStrategicPositionByType(type){
    return await StrategicPosition.findAll({
        where: {type_service: type},
        attributes: [
            'id',
            'type_service',
            'name',
            'officer_change_phone',
            'officer_change_name',
            'officer_change_cip',
            'address',
            'latitude',
            'longitude',
        ],
        order: [['id', 'asc']],
    });
}

export async function findStrategicPositionByUserId(user_id){
    return await StrategicPositionUser.findAll({
        where: {user_id: user_id},
        attributes: ['id', 'strategic_position_id', 'user_id'],
        include: [
            {
                model: StrategicPosition,
                as: 'strategic_position',
                attributes: ['id', 'name', 'officer_change_cip', 'officer_change_name', 'officer_change_phone', 'address', 'latitude', 'longitude'],
            }
        ]
    });
}

export async function getAllStrategicPosition(){
    return await StrategicPosition.findAll({
        attributes: [
            'id',
            'type_service',
            'name',
            'officer_change_phone',
            'officer_change_name',
            'officer_change_cip',
            'address',
            'latitude',
            'longitude',
        ],
        order: [['id', 'asc']],
    });
}

export async function registerStrategicPositionUser(strategic_position_id, user_id){
    const existing = await StrategicPositionUser.findOne({
        where: { strategic_position_id, user_id }
    });

    if (existing) {
        // Lanzar error con mensaje y código personalizado
        const error = new Error('El usuario ya ha registrado este puesto de responsabilidad.');
        error.status = 409; // Código HTTP para conflicto
        throw error;
    }

    return await StrategicPositionUser.create({
        strategic_position_id,
        user_id
    });
}