import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "../backend/socket/soket.js";

const PORT = process.env.PORt || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // To parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser()); // To parse the incoming request cookies

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,"frontend/dist")));

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})

server.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server Runing on Port ${PORT}`)
});