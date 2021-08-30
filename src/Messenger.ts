import { TextChannel } from "discord.js";
import { client, generator } from ".";
import { ServerData } from "./ServerData";
import { getTextChannel, sendMessageID } from "./Utils";

export class Messenger {

    lastUpdate = 0;
    data = new Map<string, ServerData[]>();
    messages = new Map<string, string>();
    cancelled = false;

    public constructor(servers: ServerData[]) {
        servers.forEach(c => {
            let channels = this.data.get(c.channel);
            if (channels == null)
                channels = [];
            channels.push(c);
            this.data.set(c.channel, channels);
        });
        if (this.data.size != 1) {
            console.warn("Timer was created with " + this.data.size + " channels.");
            console.warn("This is usually unintended, each timer should only have 1 channel.")
        }

        for (let c of this.data.keys()) {
            this.purge(c);
        }
    }

    async purge(channel: string) {
        let chan = getTextChannel(channel);
        (chan as TextChannel).bulkDelete(100);
    }

    send(data: ServerData) {
        if (!this.hasServerData(data))
            console.warn("Sending server data " + data.channel + " that we aren't responsible for it!");
        sendMessageID(data.channel, generator.generateMessage(data), data);
    }

    public hasServerData(data: ServerData) {
        for (let svs of this.data.values()) {
            for (let server of svs) {
                if (server.name == data.name)
                    return true;
            }
        }
        return false;
    }

    public cancel() {
        this.cancelled = true;
    }

    public update(data: ServerData) {
        if (!this.hasServerData(data)) {
            console.warn("Attempted to save " + data.channel + " when we aren't responsible for it.");
            return;
        }
        let ds = this.data.get(data.channel);
        if (ds == undefined)
            ds = [];
        ds = ds.filter(e => e.name === data.name);
        this.data.set(data.channel, ds);
    }

    public start(rate: number) {
        if (this.cancelled)
            return;
        setTimeout(() => {
            if (this.cancelled)
                return;
            for (let data of this.data.values())
                data.forEach(d => this.send(d));
            this.start(rate);
        }, rate);
        console.log(this.data);
    }


}