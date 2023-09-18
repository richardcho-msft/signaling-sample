import React from "react";
import MidCallControl from "./MidCallControl";
import { Stack } from "@fluentui/react";
import { VideoGallery, VideoGalleryRemoteParticipant } from "@azure/communication-react";
import { CallParticipant } from "@azure/communication-call-automation";
import { getIdentifierRawId } from "@azure/communication-common";

export interface IMidCallContainerProps {
    callConnectionId: string;
    participants: CallParticipant[];
}

const dummyParticipant = {
    userId: "test",
};

function callParticipantToVideoGalleryParticipant(callParticipant: CallParticipant): VideoGalleryRemoteParticipant {
    const { isMuted, identifier } = callParticipant;
    const rawId = getIdentifierRawId(identifier!);

    return {
        userId: rawId!,
        isMuted,
        displayName: rawId,
    };
}

export default function MidCallContainer(props: IMidCallContainerProps) {
    const { callConnectionId, participants } = props;

    return (
        <div>
            <Stack style={{ height: "50vh " }}>
                <VideoGallery
                    localParticipant={dummyParticipant}
                    remoteParticipants={participants.map(callParticipantToVideoGalleryParticipant)}
                />
            </Stack>
            <MidCallControl callConnectionId={callConnectionId} />
        </div>
    );
}