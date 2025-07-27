import express from "express";
import {validateCipWithMaspol, validateUserToken} from "#services";

const api = express.Router();

api.post("/api-extern/search-maspol", async (req, res) => {

    const {user_number_cip} = req.body;

    try {
        const cipResponse = await validateCipWithMaspol(user_number_cip);
        if (cipResponse.stateResponse === "1") {
            return res.status(403).json({
                success: false,
                message: 'El CIP no es válido',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Efectivo encontrado',
            data: cipResponse.data
        });
    } catch (e) {
        return res.status(500).json({success: false, message: 'Error de servidor', error: e});
    }

});

api.post("/api-extern/valida-token", async (req, res) => {

    const {user_cip, user_token} = req.body;

    try {
        const tokenResponse = await validateUserToken(user_cip, user_token);
        if (!tokenResponse.valid) {
            return res.status(401).json({
                success: false,
                message: tokenResponse.message,
                error: tokenResponse.message
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Token correcto',
            data: tokenResponse.valid
        });
    } catch (e) {
        return res.status(500).json({success: false, message: 'Error de servidor', error: e});
    }

});

export const useApiExtern = api;
