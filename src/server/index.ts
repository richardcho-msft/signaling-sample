import { CallAutomationClient } from "@azure/communication-call-automation";
import { apiServer, httpServer } from "./servers";

const client = new CallAutomationClient("endpoint=https://azure-sdk-dev.communication.azure.com/;accesskey=j5yTlevc+fwGF2FLBgtlY/5TU5p4Tv0fZenzXBpHdfFgbNMruVRua9ZEjuwjNymMrIc5ikuy/2lKUhAyY20tCA==");
const ngrok = process.env.NGROK;

apiServer.on("connection", (socket) => {
    console.log("api connected");

    socket.on("createCall", async (createCallOptions, callback) => {
        console.log("Creating call");

        try {
            const { targetParticipant, sourceCallIdNumber } = createCallOptions;

            await client.createCall({ targetParticipant, sourceCallIdNumber }, `${ngrok}/notifications`);

            callback(true);
        } catch (error) {
            callback(false);
        }
    });
});

httpServer.listen(3000);
