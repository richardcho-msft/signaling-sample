import React from "react";
import { ControlBar } from "@azure/communication-react";
import CallButton from "./buttons/CallButton";
import GroupCallButton from "./buttons/GroupCallButton";
import { apiSocket } from "../sockets";
import { CallInvite } from "@azure/communication-call-automation";

apiSocket.on("connect_error", (error) => {
    console.log("failed");
    console.log(error);
});

export interface IOutboundCallControlProps {
    callInvite?: CallInvite;
}

function createCall(callInvite: CallInvite | undefined) {
    apiSocket.emit(
        "createCall",
        callInvite,
        (connected: boolean) => {
            console.log(connected);
        }
    );
}

export default function OutboundCallControl(props: IOutboundCallControlProps) {
    const { callInvite } = props;

    return (
        <ControlBar layout="horizontal">
            <CallButton key="call-button" onClick={() => { createCall(callInvite); }} />
            <GroupCallButton key="group-call-button" onClick={() => { }} />
        </ControlBar>
    );
}