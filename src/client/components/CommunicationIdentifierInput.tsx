import { ChoiceGroup, IChoiceGroupOption, TextField } from "@fluentui/react";
import React, { useState } from "react";

export interface ICommunicationIdentifierInputProps {
    setIdentifier: (id: string, type: string | undefined) => void;
    setDisplayName: (displayName: string) => void;
    setSourceCallerIdNumber: (callerIdNumber: string) => void;
}

export default function CommunicationIdentifierInput(props: ICommunicationIdentifierInputProps) {
    const { setIdentifier, setDisplayName, setSourceCallerIdNumber } = props;
    const [selectedOption, selectOption] = useState<string | undefined>("communicationUser");
    const options: IChoiceGroupOption[] = [
        { key: "communicationUser", text: "Communication User", iconProps: { iconName: "People" } },
        { key: "phoneNumber", text: "Phone Number", iconProps: { iconName: "Phone" } },
        { key: "microsoftTeamsUser", text: "Teams User", iconProps: { iconName: "TeamsLogo" }, disabled: true },
    ];

    return (
        <div>
            <ChoiceGroup
                label="select communication identifier type"
                defaultSelectedKey="communicationUser"
                selectedKey={selectedOption}
                options={options}
                onChange={(e, option) => { selectOption(option?.key); }}
            />
            <TextField
                label="identifier"
                onChange={(e) => setIdentifier(e.currentTarget.value, selectedOption)}
            />
            <TextField
                label="display name"
                onChange={(e) => setDisplayName(e.currentTarget.value)}
            />
            {selectedOption === "phoneNumber" &&
                <TextField
                    label="source caller ID number"
                    onChange={(e) => { setSourceCallerIdNumber(e.currentTarget.value); }}
                />}
        </div>
    );
}