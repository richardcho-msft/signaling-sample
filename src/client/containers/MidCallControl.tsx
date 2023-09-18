import { ControlBar, EndCallButton } from "@azure/communication-react";
import React, { useState } from "react";
import AddParticipantButton from "../components/buttons/AddParticipantButton";
import RemoveParticipantButton from "../components/buttons/RemoveParticipantButton";
import { apiSocket } from "../sockets";
import { CallInvite } from "@azure/communication-call-automation";

export interface IMidCallControlProps {
    callConnectionId: string;
}

function terminateCall(callConnectionId: string) {
    apiSocket.emit(
        "terminate",
        { isForEveryOne: true, callConnectionId },
        (success: boolean) => {
            console.log("terminate " + success);
        });
}

export default function MidCallControl(props: IMidCallControlProps) {
    const { callConnectionId } = props;

    return (
        <ControlBar layout="horizontal">
            <AddParticipantButton
                key="add-participant"
                onClick={() => { }}
            />
            <RemoveParticipantButton
                key="remove-participant"
                onClick={() => { }}
            />
            <EndCallButton
                key="end-call"
                showLabel={true}
                label="end call"
                onClick={() => { terminateCall(callConnectionId); }}
            />
        </ControlBar>
    );
}