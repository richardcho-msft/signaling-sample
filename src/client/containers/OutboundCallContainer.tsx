import React, { useState } from "react";
import OutboundCallControl from "../components/OutboundCallControl";
import CommunicationIdentifierInput from "../components/CommunicationIdentifierInput";
import { createCallInvite } from "../../common/callInvite";

export default function OutboundCallContainer() {
    const [displayName, setDisplayName] = useState<string>();
    const [callerIdNumber, setCallerIdNumber] = useState<string>();
    const [userType, setUsertype] = useState<string>();
    const [identifier, setIdentifier] = useState<string>();

    return (
        <div>
            <CommunicationIdentifierInput
                setDisplayName={(value) => { setDisplayName(value); }}
                setIdentifier={(id, type) => { setIdentifier(id); setUsertype(type); }}
                setSourceCallerIdNumber={(value) => { setCallerIdNumber(value); }}
            />
            <OutboundCallControl callInvite={createCallInvite(identifier ?? "", userType, displayName, callerIdNumber)} />
        </div>
    );
}