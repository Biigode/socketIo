// 1. Importe a biblioteca cliente do Socket.IO
import { io } from "socket.io-client";

// 2. Conecte ao servidor usando a URL do servidor
const socket = io("http://localhost:3000"); // substitua pela URL do seu servidor

// 3. Defina os manipuladores de eventos
socket.on("connect", () => {
  console.log("Conectado ao servidor");
});

socket.on("message", (msg) => {
  console.log("Mensagem recebida: " + msg);
});

socket.emit('createRoom', 'nomeDaSala');

socket.on("disconnect", () => {
  console.log("Desconectado do servidor");
});
