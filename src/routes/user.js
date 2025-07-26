import express from "express";
import {mustAuth} from "#middlewares";
import {UserController} from "#controllers";

const api = express.Router();
api.post("/user/me", mustAuth, UserController.getMe);
api.put('/user/update', mustAuth, UserController.update);

export const userRoutes = api;
