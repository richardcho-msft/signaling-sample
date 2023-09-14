import { ControlBarButton } from "@azure/communication-react";
import { ButtonProps } from "@fluentui/react-components";
import { PersonAdd20Filled } from "@fluentui/react-icons";
import React from "react";

export default function AddParticipantButton(props: ButtonProps) {
    const { key, onClick } = props;

    return (
        <ControlBarButton
            key={key}
            showLabel={true}
            label="add participant"
            onClick={onClick}
            onRenderIcon={() => <PersonAdd20Filled />}
        />
    )
}