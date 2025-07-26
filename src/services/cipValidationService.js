import { ApiServiceWebMaspol } from "#api";


export async function validateCipWithMaspol(user_cip) {
    const params = {
        cip: user_cip,
        idapp: 24,
        idref: 1,
        op: 'maspolcip',
        tk: 'abc'
    };

    const response = await ApiServiceWebMaspol.get('', { params });
    return response.data;
}