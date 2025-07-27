import {server} from "./app.js";
import {PORT_SERVER, IP_SERVER, io} from "#utils";
import {dbConnectMysqlSocialEventGeo} from '#config';

(async () => {
    await dbConnectMysqlSocialEventGeo();
})()



server.listen(PORT_SERVER, `${IP_SERVER}` || 'localhost', () => {
    console.log(`Socket.io escuchando en http://${IP_SERVER}:3000`);
    io.sockets.on("connection", (socket) => {
        console.log("Nuevo usuario conectado");

        socket.on('sendLocationAgent', (location) => {
            console.log('Ubicación recibida:', location);
            // Aquí puedes realizar cualquier acción con la ubicación recibida
            // Por ejemplo, retransmitirla a otros clientes:
            io.emit('receiveLocation', location);
        });

        socket.on('disconnect', (reason) => {
            console.log('❌ Cliente desconectado:', reason); // <-- Esto te dará pistas (ping timeout, transport close, etc.)
        });
    });
})
