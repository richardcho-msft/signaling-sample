import { Call20Filled } from "@fluentui/react-icons";
import React from "react";
import BaseButton, { IButtonProps } from "./BaseButton";

export default function CallButton(props: IButtonProps) {
    const { key, onClick } = props;

    return (
        <BaseButton
            showLabel={true}
            label="create call"
            key={key}
            onClick={onClick}
            renderIcon={<Call20Filled />}
        />
    );
}