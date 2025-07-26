import express from "express";
import {GeolocationController} from "#controllers";


const api = express.Router();

api.post("/geolocation/send-coordinates", GeolocationController.sendCoordinates);
api.get("/geolocation/get-coordinates", GeolocationController.getCoordinates);

export const geolocationRoutes = api;
