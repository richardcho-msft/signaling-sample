import * as React from "react";
import OutboundCallControl from "../components/OutboundCallControl";
import { apiSocket, eventsSocket } from "../sockets";
import EventContainer from "./EventContainer";

export default function App() {
    apiSocket.connect();
    eventsSocket.connect();

    return (
        <div>
            <h1>Hello world</h1>
            <OutboundCallControl />
            <EventContainer />
        </div>
    );
}