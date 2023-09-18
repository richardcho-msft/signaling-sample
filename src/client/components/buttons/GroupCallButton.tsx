import { PeopleCall20Filled } from "@fluentui/react-icons";
import React from "react";
import BaseButton, { IButtonProps } from "./BaseButton";

export default function GroupCallButton(props: IButtonProps) {
    const { key, onClick } = props;

    return (
        <BaseButton
            showLabel={true}
            label="create group call"
            key={key}
            onClick={onClick}
            renderIcon={<PeopleCall20Filled />}
        />
    );
}