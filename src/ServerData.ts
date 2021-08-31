export class ServerData {
    name = "";
    sourceName = "";
    ip = "";
    channel = "";
    players: string[] = []; joined: string[] = []; left: string[] = [];
    max = 64;
    message = "";
    map = "Unknown";
    ping = 0;

    public constructor(data: any) {
        this.name = data.name;
        this.ip = data.ip;
        this.channel = data.channel;
    }

    public update(data: ServerData) {
        if (this.sourceName.length == 0 && data.sourceName.length != 0)
            this.sourceName = data.sourceName;
        this.map = data.map;
        this.max = data.max;
        this.ping = data.ping;

        this.joined = []; this.left = [];
        for (let p of data.players) {
            if (!this.players.includes(p)) {
                this.joined.push(p);
                console.log(p + " joined");
            }
        }
        for (let p of this.players) {
            if (!data.players.includes(p)) {
                this.left.push(p);
                console.log(p + " left");
            }
        }
        this.players = data.players;
    }
}