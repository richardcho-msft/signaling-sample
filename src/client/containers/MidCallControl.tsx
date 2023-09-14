import { ControlBar, EndCallButton } from "@azure/communication-react";
import React from "react";
import AddParticipantButton from "../components/buttons/AddParticipantButton";
import RemoveParticipantButton from "../components/buttons/RemoveParticipantButton";

export default function MidCallControl() {
    return (
        <ControlBar layout="horizontal">
            <AddParticipantButton key="add-participant" />
            <RemoveParticipantButton key="remove-participant" />
            <EndCallButton key="end-call" showLabel={true} label="end call" />
        </ControlBar>
    );
}