import { apiServer, httpServer } from "./servers";
import { getClient, updateClient } from "./CallAutomationClient";

const ngrok = process.env.NGROK;

apiServer.on("connection", (socket) => {
    console.log("api connected");

    socket.on("updateClient", (updateClientOptions, callback) => {
        const { connectionString, options } = updateClientOptions;

        try {
            updateClient(connectionString, options);
            callback(true);
        } catch ( error) {
            console.log("update failed " + error);
            
            callback(false);
        }
    })

    socket.on("createCall", async (createCallOptions, callback) => {
        console.log("Creating call");

        try {
            const { targetParticipant, sourceCallIdNumber } = createCallOptions;

            await getClient().createCall({ targetParticipant, sourceCallIdNumber }, `${ngrok}/notifications`);

            callback(true);
        } catch (error) {
            callback(false);
        }
    });

    socket.on("terminate", async (terminateCallOptions, callback) => {
        try {
            const { isForEveryOne, callConnectionId } = terminateCallOptions;

            await getClient().getCallConnection(callConnectionId).hangUp(isForEveryOne);
            
            callback(true);
        } catch (error) {
            callback(false);
        }
    });

    socket.on("addParticipant", async (addParticipantOptions, callback) => {
        try {
            const { targetParticipant, callConnectionId } = addParticipantOptions;

            await getClient().getCallConnection(callConnectionId).addParticipant(targetParticipant);
            
            callback(true);
        } catch (error) {
            callback(false);
        }
    });

    socket.on("removeParticipant", async (removeParticipantOptions, callback) => {
        try {
            const { participant, callConnectionId } = removeParticipantOptions;

            await getClient().getCallConnection(callConnectionId).removeParticipant(participant);
            
            callback(true);
        } catch (error) {
            callback(false);
        }
    });
});

httpServer.listen(3000);
