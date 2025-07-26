import { ApiServiceWebTokenDifital } from "#api";

export async function validateUserToken(user_cip, user_token) {

  const params = {
    MASPE_CARNE: user_cip,
    Token: user_token,
  };

  const response = await ApiServiceWebTokenDifital.get('', {params});

  const text = response.data?.toString().trim();

  if (response.status === 200 && text === 'Código válido.') {
    return { valid: true };
  }

  return { valid: false, message: 'El Token ingresado es inválido' };
}