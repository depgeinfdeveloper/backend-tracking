import { Server as SocketServer } from "socket.io";

export let io = null;

export function initSocketServer(server) {
    io = new SocketServer(server, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST'],
            credentials: false,
        },
        transports: ['websocket'],
    });
}