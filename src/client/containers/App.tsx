import React, { useState } from "react";
import { apiSocket, eventsSocket } from "../sockets";
import EventContainer from "./EventContainer";
import ClientCredentialModal from "../components/modals/ClientCredentialModal";
import OutboundCallContainer from "./OutboundCallContainer";
import { MessageBar, MessageBarType } from "@fluentui/react";
import ModalContainer from "./ModalContainer";
import MidCallContainer from "./MidCallContainer";
import { CallParticipant } from "@azure/communication-call-automation";

apiSocket.connect();
eventsSocket.connect();

function checkClientCredentials() {
    const connectionString = localStorage.getItem("connectionString");

    if (connectionString) {
        apiSocket.emit("updateClient", { connectionString }, (isSuccessful: boolean) => { });

        return true;
    }

    return false;
}

export default function App() {
    const [clientCredentialsProvided, setClientCredentials] = useState(checkClientCredentials());
    const [callConnected, setCallconnectionState] = useState(false);
    const [callConnectionId, setCallConnectionId] = useState("");
    const [correlationId, setCorrelationId] = useState("");
    const [participants, updateParticipantList] = useState<CallParticipant[]>([]);
    const [isAddParticipantModalHidden, toggleAddParticipantDialog] = useState(true);
    const [isRemoveParticipantModalHidden, toggleRemoveParticipantDialog] = useState(true);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {
                (callConnected && correlationId) &&
                <MessageBar messageBarType={MessageBarType.info}>
                    Open CFV: <a href={`https://ngc.skype.net/call/${correlationId}`} target="_blank">{correlationId}</a>
                </MessageBar>
            }
            {!clientCredentialsProvided && <ClientCredentialModal setClientCredentials={setClientCredentials} />}
            {
                callConnected ?
                    <MidCallContainer callConnectionId={callConnectionId} participants={participants} /> :
                    <OutboundCallContainer />
            }
            <ModalContainer />
            <EventContainer
                setCallConnectionState={setCallconnectionState}
                setCallConnectionId={setCallConnectionId}
                setCorrelationId={setCorrelationId}
                onParticipantsUpdated={updateParticipantList}
            />
        </div>
    );
}