import { Channel, Message, MessageEmbed, MessagePayload, TextChannel } from "discord.js";
import { client } from ".";
import { ServerData } from "./ServerData";

let messages = new Map<string, Message>();

export function sendMessage(channel: TextChannel, msg: any, data: ServerData) {
    if (messages.has(data.name)) {
        messages.get(data.name)?.fetch().then(m => {
            if (m == null) {
                if (msg instanceof MessagePayload) {
                    channel.send(msg).then(msg => messages.set(data.name, msg));
                } else if (msg instanceof MessageEmbed) {
                    channel.send({ embeds: [msg] }).then(m => messages.set(data.name, m));
                }
                return;
            }

            if (msg instanceof MessagePayload) {
                m.edit(msg);
            } else if (msg instanceof MessageEmbed) {
                m.edit({ embeds: [msg] });
            }
        });
        return;
    }
    if (msg instanceof MessagePayload) {
        channel.send(msg).then(msg => messages.set(data.name, msg));
    } else if (msg instanceof MessageEmbed) {
        channel.send({ embeds: [msg] }).then(m => messages.set(data.name, m));
    }
}

export function sendMessageID(id: string, msg: any, data: ServerData) {
    let chan = getTextChannel(id);
    if (chan != undefined)
        sendMessage(chan, msg, data);
}

export function getChannel(id: string): Channel | undefined {
    let chan = client.channels.cache.get(id);
    if (chan == null)
        console.error("Invalid channel: " + id);
    return chan;
}

export function getTextChannel(id: string): TextChannel | undefined {
    let chan = getChannel(id);
    if (!chan?.isText || chan?.type != "GUILD_TEXT") {
        console.error("Invalid channel: " + id);
        return undefined;
    }

    return chan as TextChannel;
}