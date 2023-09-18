import { PersonDelete20Filled } from "@fluentui/react-icons";
import React from "react";
import BaseButton, { IButtonProps } from "./BaseButton";

export default function RemoveParticipantButton(props: IButtonProps) {
    const { key, onClick } = props;

    return (
        <BaseButton
            key={key}
            showLabel={true}
            label="remove participant"
            onClick={onClick}
            renderIcon={<PersonDelete20Filled />}
        />
    )
}