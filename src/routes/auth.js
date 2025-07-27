import express from "express";
import { AuthController } from "#controllers";
import { validate } from '#middlewares';
import {SignInValidationSchema, RefreshAccessTokenValidationSchema, SignInTokenValidationSchema } from '#utils';

const api = express.Router();


api.post("/auth/verify-user-system", AuthController.verifyUser);
api.post("/auth/register-user-system", AuthController.registerUser);
api.post("/auth/login", validate(SignInValidationSchema), AuthController.login);

export const authRoutes = api;
