import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
});

export const getRecevierSocketId = (receiverId) => {
    return userSoketMap[receiverId];
};

const userSoketMap = {};

io.on("connection",(socket) => {
    console.log("A user connected",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSoketMap[userId] = socket.id;

    io.emit("getOnlineUsers",Object.keys(userSoketMap));

    socket.on("disconnect",() => {
        console.log("A user disconnected");
        delete userSoketMap[userId];

        io.emit("getOnlineUsers",Object.keys(userSoketMap));
    });
});

export { app, io, server};