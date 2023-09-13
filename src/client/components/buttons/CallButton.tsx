import { ControlBarButton } from "@azure/communication-react";
import { Call20Filled } from "@fluentui/react-icons";
import React from "react";
import { ButtonProps } from "./ButtonProps";

export default function CallButton(props: ButtonProps) {
    const { key, onClick } = props;

    return (
        <ControlBarButton
            key={key}
            onClick={onClick}
            onRenderIcon={() => <Call20Filled />}
        />
    );
}