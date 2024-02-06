import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_PORT = 3000;

class ChatServer {
  constructor(port = DEFAULT_PORT) {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer);
    this.createdRooms = [];
    this.port = port;
  }

  start() {
    this.io.on("connection", (socket) => this.setupSocketHandlers(socket));
    this.httpServer.listen(this.port, () => console.log(`Servidor rodando na porta ${this.port}`));
  }

  setupSocketHandlers(socket) {
    console.log(`Um usuário se conectou no pool de default ${socket.id}`);
    socket.on("createRoom", (roomName) => this.handleCreateRoom(socket, roomName));
    socket.on("joinRoom", (roomName) => this.handleJoinRoom(socket, roomName));
    socket.on("sendMessage", (data) => this.handleSendMessage(socket, data));
    socket.on("listRooms", () => this.handleListRooms(socket));
    socket.on("disconnect", () => this.handleDisconnect(socket));
  }

  handleCreateRoom(socket, roomName) {
    const newRoom = roomName || uuidv4();
    this.createdRooms.push(newRoom);
    socket.emit("roomCreated", newRoom);
  }

  handleJoinRoom(socket, roomName) {
    socket.join(roomName);
    socket.emit("message", `Você entrou na sala ${roomName}`);
  }

  handleSendMessage(socket, data) {
    // this.io.to(data.room).emit("message",{ room: data.room, message: data.message });
    socket.broadcast.to(data.room).emit("message",{ room: data.room, message: data.message });
  }

  handleListRooms(socket) {
    socket.emit("roomsList", this.createdRooms);
  }

  handleDisconnect(socket) {
    console.log("Um usuário se desconectou");
  }
}

const chatServer = new ChatServer();
chatServer.start();