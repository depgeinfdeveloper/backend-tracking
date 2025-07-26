import { jwt } from "#utils";

export const mustAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) return res.status(403).send({error: "La petición no tiene la cabecera de autenticación"})

    try {
        const token = authorization.split('Bearer ')[1];

        const hasExpired = jwt.hasExpiredToken(token);
        console.log("token", hasExpired);
        if (hasExpired) {
            return res.status(403).send({error: "El token ha expirado"})
        }

        const payload = jwt.decoded(token);
        req.user = payload;
        console.log("payload", payload);

        next();
    } catch (error) {
        return res.status(403).send({ error: "Token invalido" })
    }
}
