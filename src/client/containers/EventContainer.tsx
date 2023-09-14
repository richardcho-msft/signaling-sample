import React from "react";
import { eventsSocket } from "../sockets";
import { CallAutomationEvent } from "@azure/communication-call-automation";
import { Toast, ToastBody, ToastTitle, Toaster, useToastController } from "@fluentui/react-toast";
import { useId } from "@fluentui/react-components";


export default function EventContainer() {
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
        const { kind, ...eventBody } = callbackEvent;
        Object.entries(eventBody).forEach(([key, value]) => { console.log(value); console.log(key); })

        dispatchToast(
            <Toast>
                <ToastTitle>{kind}</ToastTitle>
                <ToastBody>
                    {/* {
                        Object.entries(eventBody).map(([key, value]) => (
                            <div key={key+"-"+value}>`{key}: {value}`</div>))
                    } */}test
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