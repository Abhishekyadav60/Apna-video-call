

// ///http://localhost:8000/api/v1/users/login










import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();  // VERY IMPORTANT

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);

const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});


app.use("/api/v1/users", userRoutes);

const start = async () => {
    // console.log("MONGO_URI:", process.env.MONGO_URI); // debug line

    try {
        const connectionDb = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connectionDb.connection.host}`);

        server.listen(app.get("port"), () => {
            console.log(`Listening on PORT ${app.get("port")}`);
        });
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
    }
};

start();
