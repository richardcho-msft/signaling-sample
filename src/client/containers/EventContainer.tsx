import React, { Dispatch } from "react";
import { eventsSocket } from "../sockets";
import { CallAutomationEvent, CallParticipant, ParticipantsUpdated } from "@azure/communication-call-automation";
import { Toast, ToastBody, ToastTitle, Toaster, useToastController } from "@fluentui/react-toast";
import { useId } from "@fluentui/react-components";
import { getIdentifierRawId } from "@azure/communication-common";

export interface IEventContainerProps {
    setCallConnectionState: Dispatch<boolean>;
    setCallConnectionId: Dispatch<string>;
    setCorrelationId: Dispatch<string>;
    onParticipantsUpdated: Dispatch<CallParticipant[]>;
}

function parseEvent(event: CallAutomationEvent) {
    const { kind, ...eventBody } = event;
    const toastElement = Object
        .entries(eventBody)
        .map(([key, value]) => {
            if (key === "participants") {
                return (
                    <div key={key}>
                        <div>{`identifier: ${getIdentifierRawId(value.identifier)}`}</div>
                        <div>{`isMuted: ${value.isMuted}`}</div>
                    </div>
                )
            }

            return <div key={`${key}-${value}`}>{`${key}: ${value}`}</div>;
        });

    return {
        kind,
        toastElement,
    };
}

export default function EventContainer(props: IEventContainerProps) {
    const {
        setCallConnectionState,
        setCallConnectionId,
        setCorrelationId,
        onParticipantsUpdated
    } = props;
    const toastId = useId("callbackEvents");
    const { dispatchToast } = useToastController(toastId);

    eventsSocket.on("connect_error", (error) => {
        console.log("event failed");
        console.log(error);
    });

    eventsSocket.on("connect", () => {
        console.log("event connected");
    });

    eventsSocket.on("callbackEvent", (callbackEvent: CallAutomationEvent) => {
        const { kind, toastElement } = parseEvent(callbackEvent);

        if (kind === "CallConnected") {
            setCallConnectionState(true);
            setCallConnectionId(callbackEvent.callConnectionId);
            setCorrelationId(callbackEvent.correlationId);
        }

        if (kind === "CallDisconnected") {
            setCallConnectionState(false);
        }

        if (kind === "ParticipantsUpdated") {
            const { participants = [] } = callbackEvent as ParticipantsUpdated;

            onParticipantsUpdated(participants);
        }

        dispatchToast(
            <Toast>
                <ToastTitle>{kind}</ToastTitle>
                <ToastBody>
                    <div>{toastElement}</div>
                </ToastBody>
            </Toast>
        );
    });

    return <Toaster
        toasterId={toastId}
        position="top-end"
        pauseOnHover={true}
        timeout={5000}
    />;
}