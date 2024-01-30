// 1. Importe os módulos necessários
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

// 2. Crie uma instância do aplicativo Express
const app = express();

// 3. Crie um servidor HTTP a partir do aplicativo Express
const httpServer = createServer(app);

// 4. Anexe o servidor Socket.IO ao servidor HTTP
const io = new Server(httpServer, {
    // opções do socket.io se necessário
});

setInterval(() => {
    io.emit('message', 'Esta é uma mensagem de broadcast');
}, 5000);

// 5. Defina os manipuladores de eventos do Socket.IO
io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    

    socket.on('disconnect', () => {
        console.log('Um usuário se desconectou');
    });
});

// 6. Inicie o servidor HTTP
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));