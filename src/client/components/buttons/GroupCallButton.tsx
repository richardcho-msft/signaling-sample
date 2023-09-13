import { ControlBarButton } from "@azure/communication-react";
import { PeopleCall20Filled } from "@fluentui/react-icons";
import React from "react";
import { ButtonProps } from "./ButtonProps";

export default function GroupCallButton(props: ButtonProps) {
    const { key, onClick } = props;

    return (
        <ControlBarButton
            key={key}
            onClick={onClick}
            onRenderIcon={() => <PeopleCall20Filled />}
        />
    );
}