import React, { useState } from "react";
import OutboundCallControl from "./OutboundCallControl";
import { apiSocket, eventsSocket } from "../sockets";
import EventContainer from "./EventContainer";
import MidCallControl from "./MidCallControl";
import ClientCredentialModal from "../components/modals/ClientCredentialModal";

apiSocket.connect();
eventsSocket.connect();

function checkClientCredentials() {
    const connectionString = localStorage.getItem("connectionString");

    if (connectionString) {
        apiSocket.emit("updateClient", { connectionString }, (isSuccessful: boolean) => {});

        return true;
    }

    return false;
}

export default function App() {
    const [clientCredentialsProvided, setClientCredentials] = useState(checkClientCredentials());
    const [callConnected, setCallconnectionState] = useState(false);

    return (
        <div>
            <h1>Hello world</h1>
            {!clientCredentialsProvided ? <ClientCredentialModal setClientCredentials={setClientCredentials} /> : null}
            {callConnected ? <MidCallControl /> : <OutboundCallControl />}
            <EventContainer />
        </div>
    );
}