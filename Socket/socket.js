require('dotenv').config({ path: `${process.cwd()}/.env` });
const { Server } = require("socket.io")

const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173/'],
        methods: ['GET', 'POST'],
    },
});

io.on("connection", (socket) => {
    console.log("Id : ", socket.id)
});

module.exports = {
    app, io, server
}