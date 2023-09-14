import { parseCallAutomationEvent } from "@azure/communication-call-automation";
import { Request, Response } from "express";
import { eventsServer } from "../servers";

export async function callbackEventController(req: Request, res: Response) {
    try {
        const callAutomationEvent = parseCallAutomationEvent(req.body[0]);
        console.log(callAutomationEvent);

        eventsServer.sockets.emit("callbackEvent", callAutomationEvent);
    } catch (e) {
        console.log(e);
    }
}