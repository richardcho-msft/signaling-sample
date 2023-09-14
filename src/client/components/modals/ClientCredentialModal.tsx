import { Dialog, DialogFooter, DialogType, IDialogContentProps, IModalProps, PrimaryButton, TextField } from "@fluentui/react";
import React, { Dispatch, useState } from "react";
import { apiSocket } from "../../sockets";

export interface IClientCredentialModalProps {
    setClientCredentials: Dispatch<boolean>;
}

function updateClientCredentials(
    connectionString: string,
    toggleHideDialog: Dispatch<boolean>,
    setClientCredentials: Dispatch<boolean>) {
    apiSocket.emit("updateClient", { connectionString }, (isSuccessful: boolean) => {
        if (isSuccessful) {
            localStorage.setItem("connectionString", connectionString);
            toggleHideDialog(true);
            setClientCredentials(true);
        }
    });
}

export default function ClientCredentialModal(props: IClientCredentialModalProps) {
    const [isHidden, toggleHideDialog] = useState(false);
    const [connectionString, setConnectionString] = useState("");

    const dialogContentProps: IDialogContentProps = {
        type: DialogType.largeHeader,
        title: "Enter ACS connection string",
    };
    const modalProps: IModalProps = {
        isBlocking: true,
    };

    return (
        <Dialog
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
            hidden={isHidden}
            onDismiss={() => { toggleHideDialog(true); }}
        >
            <TextField
                label="connection string"
                onChange={(e) => setConnectionString(e.currentTarget.value)}
            />
            <DialogFooter>
                <PrimaryButton
                    onClick={() => {
                        updateClientCredentials(
                            connectionString,
                            toggleHideDialog,
                            props.setClientCredentials);
                    }}
                    text="Set"
                />
            </DialogFooter>
        </Dialog>
    )
}