import { CallAutomationClient, CallAutomationClientOptions } from "@azure/communication-call-automation";

let client: CallAutomationClient;

export function updateClient(connectionString: string, options?: CallAutomationClientOptions) {
    console.log("updating client with " + connectionString);
    client = new CallAutomationClient(connectionString, options);
}

export function getClient() {
    return client;
}