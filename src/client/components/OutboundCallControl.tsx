import React from "react";
import { ControlBar } from "@azure/communication-react";
import CallButton from "./buttons/CallButton";
import GroupCallButton from "./buttons/GroupCallButton";
import { apiSocket } from "../sockets";

apiSocket.on("connect_error", (error) => {
    console.log("failed");
    console.log(error);
});

function createCall() {
    apiSocket.emit(
        "createCall",
        {
            targetParticipant: {
                phoneNumber: "+16049995119"
            },
            sourceCallIdNumber: {
                phoneNumber: "+18445661914"
            }
        },
        (connected: boolean) => {
            console.log(connected);
        }
    );
}

export default function OutboundCallControl() {
    return (
        <ControlBar layout="horizontal">
            <CallButton key="call_button" onClick={createCall} />
            <GroupCallButton key="group_call_button" onClick={() => { }} />
        </ControlBar>
    );
}