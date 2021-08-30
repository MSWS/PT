import { MessagePayload } from "discord.js";
import { ServerData } from "./ServerData";

export interface Generator {
    generateMessage(data: ServerData): MessagePayload;
}