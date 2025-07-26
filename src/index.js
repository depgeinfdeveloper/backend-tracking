import {server} from "./app.js";
import {PORT_SERVER, io} from "#utils";
import {dbConnectMysqlSocialEventGeo} from '#config';

(async () => {
    await dbConnectMysqlSocialEventGeo();
})()



server.listen(PORT_SERVER,() => {
    console.log(`Servidor corriendo en puerto ${PORT_SERVER}`);
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
