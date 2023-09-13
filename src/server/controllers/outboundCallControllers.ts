import { CallAutomationClient } from "@azure/communication-call-automation";
import { Request, Response } from "express";

const client = new CallAutomationClient("endpoint=https://azure-sdk-dev.communication.azure.com/;accesskey=j5yTlevc+fwGF2FLBgtlY/5TU5p4Tv0fZenzXBpHdfFgbNMruVRua9ZEjuwjNymMrIc5ikuy/2lKUhAyY20tCA==");

export function createCallController(req: Request, res: Response) {
    client.createCall({
        targetParticipant: {
            phoneNumber: "+16049995119"
        },
        sourceCallIdNumber: {
            phoneNumber: "+18445661914"
        }
    },
        "https://test.csont");
}