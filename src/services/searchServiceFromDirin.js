import {ApiServicesExternFromDirin, ApiServiceWebTokenDifital} from "#api";


export async function validateUserTokenDirin(user_cip, user_token) {

    const response = await ApiServicesExternFromDirin.post('/api-extern/valida-token', {
        user_cip: user_cip,
        user_token: user_token,
    });

    if (response.status === 200 && response.status === true) {
        return { valid: true };
    }

    return { valid: false, message: 'El Token ingresado es inválido' };
}


export async function validateCipWithMaspolDirin(user_cip) {

    const response = await ApiServicesExternFromDirin.post('/api-extern/valida-token', {
        user_number_cip: user_cip,
    });

    if (response.status === 200 && response.status === true) {
        return response.data;
    }

    return [];
}