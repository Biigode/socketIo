import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const MESSAGE_INTERVAL = 5000;
const SERVER_URL = "http://localhost:3000";

class ChatClient {
  constructor() {
    this.socket = io(SERVER_URL);
    this.createdRoom = "";
    this.setupSocketHandlers();
  }

  setupSocketHandlers() {
    this.socket.on("connect", () => this.handleListRooms());
    this.socket.on("roomsList", (rooms) => this.handleJoinRoom(rooms));
    this.socket.on("message", (msg) => this.handleMessage(msg));
    this.socket.on("roomCreated", (room) => this.handleRoomCreated(room));
    this.socket.on("disconnect", () => this.handleDisconnect());
  }

  handleListRooms() {
    this.socket.emit("listRooms");
  }

  handleJoinRoom(rooms) {
    if (rooms.length === 0) {
      console.log("Nenhuma sala encontrada, criando uma nova sala");
      this.socket.emit("createRoom", `sala-1-${uuidv4()}`);
    } else {
      console.log(`Sala encontrada: ${rooms[0]}`);
      this.socket.emit("joinRoom", rooms[0]);
      this.createdRoom = rooms[0];
      setInterval(() => this.sendMessage(), MESSAGE_INTERVAL);
    }
  }

  handleMessage(msg) {
    console.log("Mensagem recebida: " + JSON.stringify(msg));
  }

  handleRoomCreated(room) {
    console.log(`Sala criada: ${room}`);
    this.createdRoom = room;
    this.socket.emit("joinRoom", room);
    setInterval(() => this.sendMessage(), MESSAGE_INTERVAL);
  }

  sendMessage() {
    console.log(`Enviando mensagem para a sala ${this.createdRoom}`);
    this.socket.emit("sendMessage", {
      room: this.createdRoom,
      message: "Olá, sala2!",
    });
  }

  handleDisconnect() {
    console.log("Desconectado do servidor");
  }
}

// Uso
new ChatClient();
