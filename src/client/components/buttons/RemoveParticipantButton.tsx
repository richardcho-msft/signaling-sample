import { ControlBarButton } from "@azure/communication-react";
import { ButtonProps } from "@fluentui/react-components";
import { PersonDelete20Filled } from "@fluentui/react-icons";
import React from "react";

export default function RemoveParticipantButton(props: ButtonProps) {
    const { key, onClick } = props;

    return (
        <ControlBarButton
            key={key}
            showLabel={true}
            label="remove participant"
            onClick={onClick}
            onRenderIcon={() => <PersonDelete20Filled />}
        />
    )
}