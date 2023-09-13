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

const httpServer = createServer(app);
const io = new Server(httpServer, {
    path: "/callautomation/"
});
io.on("connection", () => {
    console.log("connected");
});

httpServer.listen(3000);
