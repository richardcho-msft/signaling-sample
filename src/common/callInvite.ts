import { CallInvite } from "@azure/communication-call-automation";
import { CommunicationIdentifierType } from "./models/CommunicationIdentifierType";

export function createCallInvite(
    id: string,
    type: string | undefined,
    displayName?: string,
    callerIdNumber?: string): CallInvite | undefined {
    if (type === CommunicationIdentifierType.CommunicationUser) {
        return {
            targetParticipant: {
                communicationUserId: id,
            },
            sourceDisplayName: displayName,
        };
    }

    if (type === CommunicationIdentifierType.PhoneNumber) {
        return {
            targetParticipant: {
                phoneNumber: id,
            },
            sourceCallIdNumber: {
                phoneNumber: callerIdNumber ?? ""
            },
            sourceDisplayName: displayName,
        };
    }

    return undefined;
}