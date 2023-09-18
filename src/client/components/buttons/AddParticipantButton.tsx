import { PersonAdd20Filled } from "@fluentui/react-icons";
import React from "react";
import BaseButton, { IButtonProps } from "./BaseButton";

export default function AddParticipantButton(props: IButtonProps) {
    const { key, onClick } = props;

    return (
        <BaseButton
            key={key}
            showLabel={true}
            label="add participant"
            onClick={onClick}
            renderIcon={<PersonAdd20Filled />}
        />
    )
}