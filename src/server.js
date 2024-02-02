import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  // opções do socket.io se necessário
});

const createdRooms = [];

io.on("connection", (socket) => {
  console.log(`Um usuário se conectou no pool de default ${socket.id}`);

  socket.on("createRoom", (roomName) => {
    const newRoom = roomName || uuidv4();
    createdRooms.push(newRoom);
    socket.emit("roomCreated", newRoom);
    console.log(`Sala ${newRoom} criada`);
  });

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    socket.emit("message", `Você entrou na sala ${roomName}`);
    console.log(`Usuário ${socket.id} entrou na sala ${roomName}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("message", {
      room: data.room,
      message: data.message,
    });
  });

  socket.on("listRooms", () => {
    socket.emit("roomsList", createdRooms);
  });

  socket.on("disconnect", () => {
    console.log("Um usuário se desconectou");
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
