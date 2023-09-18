import { Dialog, DialogFooter, DialogType, IDialogContentProps, PrimaryButton } from "@fluentui/react";
import React, { useState } from "react";
import CommunicationIdentifierInput from "../CommunicationIdentifierInput";
import { CallInvite } from "@azure/communication-call-automation";
import { apiSocket } from "../../sockets";
import { createCallInvite } from "../../../common/callInvite";

function addParticipant(callInvite: CallInvite | undefined) {
    apiSocket.emit("addParticipant", callInvite, (isSuccessfull: boolean) => {
        console.log("add participant " + isSuccessfull);
    });
}

export default function AddParticipantModal() {
    const [isHidden, toggleHideDialog] = useState(false);
    const [displayName, setDisplayName] = useState<string>();
    const [callerIdNumber, setCallerIdNumber] = useState<string>();
    const [userType, setUsertype] = useState<string>();
    const [identifier, setIdentiier] = useState<string>();

    const dialogContentProps: IDialogContentProps = {
        type: DialogType.normal,
        title: "Add participant",
    };

    return (
        <Dialog
            dialogContentProps={dialogContentProps}
            hidden={isHidden}
            onDismiss={() => { toggleHideDialog(true); }}
        >
            <CommunicationIdentifierInput
                setIdentifier={(id, type) => { setIdentiier(id); setUsertype(type); }}
                setDisplayName={(value) => { setDisplayName(value); }}
                setSourceCallerIdNumber={(value) => { setCallerIdNumber(value); }}
            />
            <DialogFooter>
                <PrimaryButton
                    onClick={() => { addParticipant(createCallInvite(identifier ?? "", userType, displayName, callerIdNumber)); }}
                    text="Add"
                />
            </DialogFooter>
        </Dialog>
    );
}