import db from "#models";
const { User, Role, UserRole } = db;

export async function findUserByCip(user_cip) {
    return await User.findOne({
        where: {number_cip_code: user_cip},
        attributes: [
            'id',
            'number_cip_code',
            'grade',
            'firstname',
            'lastname',
            'number_phone',
            'password',
            'photo',
            'gender',
            'email',
        ],
        include: [
            {
                model: Role,
                as: 'roles',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }
        ]
    });
}

export async function findUserById(user_id) {
    return await User.findOne({
        where: {id: user_id},
        attributes: [
            'id',
            'number_cip_code',
            'grade',
            'firstname',
            'lastname',
            'number_phone',
            'photo',
            'gender',
            'email',
        ],
        include: [
            {
                model: Role,
                as: 'roles',
                attributes: ['id', 'name', 'display_name'],
                through: {
                    attributes: [], // evita mostrar model_type y demás
                },
            },
        ],
    });
}

export async function createUserFromMaspol(data) {

    const existing = await User.findOne({
        where: {
            number_cip_code: data.number_cip_code
        }
    });

    if (existing) {
        const error = new Error('El usuario ya ha activado su cuenta, inicie sesión para continuar');
        error.status = 409;
        throw error;
    }

    const user =  await User.create({
        number_cip_code: data.number_cip_code,
        grade: `${data.grade} PNP` || 'SIN GRADO',
        firstname: data.firstname || 'SIN NOMBRE',
        lastname: `${data.lastname}` || 'SIN APELLIDO',
        gender: `${data.gender}`,
        password: data.user_pin,
    });

    const role = await Role.findOne({ where: { name: 'agent' } });

    await UserRole.create({
        role_id: role.id,
        model_id: user.id,
        model_type: 'App\\Models\\User'
    })

    await user.reload({
        include: [
            {
                association: User.associations.roles, // asegúrate que esté definida
            },
        ],
    });

    return user;
}

export async function updateUser(id, data) {
    const allowedFields = ['number_phone', 'email'];

    const updateData = Object.fromEntries(
        Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );

    const updatedCount = await User.update(updateData, { where: { id } });

    if (updatedCount === 0) {
        return null;
    }

    return await findUserById(id);
}