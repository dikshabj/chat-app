import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

// ✅ Import form socket.js
import { app, server } from "./socket/socket.js"; 

dotenv.config();


app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const PORT = process.env.PORT || 5001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

app.use("/user", userRoute);
app.use("/message", messageRoute);

// ✅ Change 'app.listen' to 'server.listen'
server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});