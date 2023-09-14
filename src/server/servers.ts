import Express from "express";
import Path from "path";
import Router from "./router";
import { createServer } from "http";
import { Server } from "socket.io";

const app = Express();
app.use(Express.static("dist"));
app.use(Express.json());
app.use("/", Router);

app.get("*", (_, res) => {
    res.sendFile(Path.join(__dirname, "../../dist/index.html"));
});

export const httpServer = createServer(app);

export const apiServer = new Server(httpServer, {
    path: "/api/",
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

export const eventsServer = new Server(httpServer, {
    path: "/events/",
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});