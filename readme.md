# Project to study socket.io in javascript

## How to run
1. Install node.js
2. Run `npm install` to install the dependencies
3. Run `node server.js` to start the server
4. Run `node client.js` to start the client
5. Run `node client2.js` to start another client

## How this project works
This project is a simple chat application using socket.io. The server is responsible for receiving messages from clients and broadcasting them to all connected clients. The clients are responsible for sending messages to the server and receiving messages from the server.

- The server is a simple node.js server using express and socket.io

- The clients are simple node.js applications using socket.io-client
  - The client.js create a connection to the server, then send a event to the server to create a room and join it. After that, the client send a message to the server and listen for messages from the server or other clients.

  - The client2.js create a connection to the server, then start to listen for messages from the server or other clients. After that, the client2 can send a message to the server that can be broadcasted to everyone in the current room.