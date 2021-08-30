import { getMessenger } from ".";
import { ServerData } from "./ServerData";

export class Updater {
    ip: string;
    port: number;
    data: ServerData;
    cancelled = false;
    Gamedig = require("gamedig");

    public constructor(data: ServerData) {
        this.ip = data.ip.split(":")[0];
        this.port = parseInt(data.ip.split(":")[1]);
        this.data = data;
    }

    async update() {
        await this.Gamedig.query({
            type: "csgo",
            host: this.ip,
            port: this.port,
            maxAttempts: 3
        }).then((state: any) => {
            this.data.sourceName = state.name;
            this.data.map = state.map;
            this.data.max = state.maxplayers;
            let players: string[] = [];
            for (let p of state.players) {
                if (p.name.length == 0)
                    continue;
                players.push(p.name);
            }
            this.data.ping = state.ping;
            this.data.players = players;
            getMessenger(this.data.name)?.update(this.data);
        });
    }

    public start(rate: number) {
        if (this.cancelled)
            return;
        setTimeout(() => {
            if (this.cancelled)
                return;
            this.update();
            this.start(rate);
        }, rate);
    }
}