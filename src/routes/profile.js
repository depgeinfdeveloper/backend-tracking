import express from "express";
import {mustAuth} from "#middlewares";
import {ProfileController} from "../controllers/profile.js";

const api = express.Router();

api.get("/profile/get-profile",mustAuth, ProfileController.showProfile);

export const profileRoutes = api;
