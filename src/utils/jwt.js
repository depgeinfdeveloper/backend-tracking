import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./constants.js";

const createAccessToken = (user) => {
    const expToken = new Date();
    // expToken.setHours(expToken.getHours() + 24); // El token caducará en 24 horas
    expToken.setMinutes(expToken.getMinutes() + 60); // El token caducará en 2 minutos()
    const payload = {
        token_type : "access",
        user_id: user.id,
        iat: Date.now(), // Fecha de creación del token
        exp : expToken.getTime() // Fecha de expiración de token
    }
    return jsonwebtoken.sign(payload, JWT_SECRET_KEY);
}

const createRefreshToken = (user) => {
    const expToken = new Date()
    expToken.setMonth(expToken.getMonth() + 1);
    const payload = {
        token_type : "refresh",
        user_id: user.id,
        iat: Date.now(), // Fecha de creación del token
        exp : expToken.getTime() // Fecha de expiración de token
    }
    return jsonwebtoken.sign(payload, JWT_SECRET_KEY);
}

const decoded = (token) => {
    return jsonwebtoken.decode(token, JWT_SECRET_KEY, true)
}

const hasExpiredToken = (token) => {
    const { exp } = decoded(token);
    console.log("exp", exp);
    const currentDate = new Date().getTime();
    console.log("currentDate", currentDate);
    if (exp <= currentDate) return true;
    return false;
}

export const jwt = {
    createAccessToken,
    createRefreshToken,
    decoded,
    hasExpiredToken
}
