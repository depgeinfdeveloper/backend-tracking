import express from "express";
import http from "http";
import * as https from 'https'
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import 'dotenv/config'
import { initSocketServer } from "#utils";
import {authRoutes, strategicPositionRoutes, userRoutes} from "#routes";


https.globalAgent.options.rejectUnauthorized = false

const app = express();
const server = http.createServer(app);
initSocketServer(server);

// Configurar Header HTTP - CORS
app.use(cors());

// Configurar Body Parser
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(fileUpload());

// Configurar carpeta estática
app.use(express.static("storage"));

// Configurar Logger HTTP Request
app.use(morgan("dev"));

// Configurar rutas
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", strategicPositionRoutes);

export {
    server,
}


