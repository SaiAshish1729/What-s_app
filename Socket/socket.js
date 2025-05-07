require('dotenv').config({ path: `${process.cwd()}/.env` });
const { Server } = require("socket.io")

const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
});

const userSocketMap = {
    //
}
io.on("connection", (socket) => {
    // console.log("Id : ", socket.id)
    const userId = socket.handshake.query.userId;
    // console.log(userId);

    userSocketMap[userId] = socket.id;
    // console.log(Object.keys(userSocketMap))

    io.emit("onlineUsers", Object.keys(userSocketMap))
});

module.exports = {
    app, io, server
}