import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Conectado ao servidor");
});

socket.on("message", (msg) => {
  console.log("Mensagem recebida: " + JSON.stringify(msg));
});

socket.emit("listRooms");

socket.on("roomsList", (rooms) => {
  console.log("Salas disponíveis: " + rooms[0]);
  const roomToJoin = rooms;

  socket.emit("joinRoom", roomToJoin[0]);

    // setInterval(() => {
    //   console.log(`Enviando mensagem para a sala ${roomToJoin}`);
    //   socket.emit("sendMessage", { room: roomToJoin, message: "Olá, sala!" });
    // }, 5000);
});

socket.on("disconnect", () => {
  console.log("Desconectado do servidor");
});
