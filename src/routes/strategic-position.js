import express from "express";
import {mustAuth} from "#middlewares";
import {StrategicPositionController} from "../controllers/strategic-position.js";

const api = express.Router();

api.post('/strategic-position/by-cip', mustAuth, StrategicPositionController.byCip)
api.post('/strategic-position/by-user-id', mustAuth, StrategicPositionController.byUserId)
api.post('/strategic-position/by-type', mustAuth, StrategicPositionController.byType)
api.post('/strategic-position/get-users', mustAuth, StrategicPositionController.getUsers)
api.post('/strategic-position/get-all', mustAuth, StrategicPositionController.getAll)
api.post('/strategic-position/register', mustAuth, StrategicPositionController.register)


export const strategicPositionRoutes = api;