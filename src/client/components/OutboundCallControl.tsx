import React from "react";
import { ControlBar } from "@azure/communication-react";
import CallButton from "./buttons/CallButton";
import GroupCallButton from "./buttons/GroupCallButton";

export default function OutboundCallControl() {
    return (
        <ControlBar layout="horizontal">
            <CallButton key="call_button" onClick={() => { }} />
            <GroupCallButton key="group_call_button" onClick={() => { }} />
        </ControlBar>
    );
}