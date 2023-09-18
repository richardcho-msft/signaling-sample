import { ControlBarButton } from "@azure/communication-react";
import React, { MouseEventHandler } from "react";

export interface IButtonProps {
    onClick: MouseEventHandler<HTMLElement> | undefined,
    key: string,
}

export interface IBaseButtonProps extends IButtonProps {
    renderIcon: JSX.Element;
    showLabel?: boolean;
    label?: string;
}

export default function BaseButton(props: IBaseButtonProps) {
    const { key, onClick, renderIcon, showLabel, label } = props;

    return (
        <ControlBarButton
            key={key}
            onClick={onClick}
            onRenderIcon={() => renderIcon}
            showLabel={showLabel}
            label={label}
        />
    );
}