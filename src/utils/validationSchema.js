import * as yup from 'yup';



export const SignInValidationSchema = yup.object().shape({
    user_cip: yup.string().trim().required('El numero de cip es requerido'),
    user_pin: yup.string().trim().required('El pin de seguridad es requeridoddddd')
})

export const SignInTokenValidationSchema = yup.object().shape({
    idusuarios: yup.string().trim().required('El usuario es requerido'),
    usu_pin: yup.string().trim().required('El pin es requerido'),
})

export const RefreshAccessTokenValidationSchema = yup.object().shape({
    refreshToken: yup.string().trim().required('El token es requerido')
})
