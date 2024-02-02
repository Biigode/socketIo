import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Conectado ao servidor");
});

socket.on("message", (msg) => {
  console.log("Mensagem recebida: " + JSON.stringify(msg));
});

const roomName = `sala-1-${uuidv4()}`;

socket.emit("createRoom", roomName);

var createdRoom = "";
socket.on("roomCreated", (room) => {
  console.log(`Sala criada: ${room}`);
  createdRoom = room;
  socket.emit("joinRoom", room);
  setInterval(() => {
    console.log(`Enviando mensagem para a sala ${createdRoom}`);
    socket.emit("sendMessage", { room: createdRoom, message: "Olá, sala!" });
  }, 5000);
});

socket.on("disconnect", () => {
  console.log("Desconectado do servidor");
});
