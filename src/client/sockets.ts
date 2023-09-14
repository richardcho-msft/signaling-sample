import { io } from "socket.io-client";

export const apiSocket = io(
    "http://localhost:3000",
    {
        path: "/api/",
        autoConnect: false,
    });

export const eventsSocket = io(
    "http://localhost:3000",
    {
        path: "/events/",
        autoConnect: false,
    });
