import { Collector, ColorResolvable, MessageEmbed, SystemChannelFlags } from "discord.js";
import { Generator } from "./Generator";
import { ServerData } from "./ServerData";

export class EmbedGenerator implements Generator {
    generateMessage(data: ServerData): any {
        let embed = new MessageEmbed({});

        embed.setTitle(data.sourceName.length == 0 ? data.name : data.sourceName);

        let len = 0;
        let desc = "";
        for (let player of data.players.sort()) {
            if (len + player.length > 65) {
                desc = desc.substring(0, desc.length - 2);
                desc += "\n";
                len = 0;
            }
            desc += player + ", ";
            len += (player + ", ").length;
        }
        if (desc.length > 2)
            desc = desc.substring(0, desc.length - 2);

        embed.setDescription(desc);
        embed.setColor(this.getColor(data) as ColorResolvable);

        embed.addField("Players", data.players.length + "/" + data.max, true);
        embed.addField("Map", data.map, true);

        let footer = "";

        if (data.joined.length > 0 && data.joined.length !== data.players.length) {
            footer += "[+] ";
            for (let p of data.joined)
                footer += p + ", ";
            footer = footer.substring(0, footer.length - 2);
        }
        if (data.left.length > 0) {
            footer += "[-] ";
            for (let p of data.left)
                footer += p + ", ";
            footer = footer.substring(0, footer.length - 2);
        }

        embed.setFooter(footer.length != 0 ? footer + "\n" + data.ip : data.ip);
        embed.setTimestamp(Date.now());
        return embed;
    }

    getColor(data: ServerData): string {
        let percent = data.players.length / data.max;
        let r = (percent * 255);
        let g = Math.cos((data.map.length) + 1) * 255;
        let b = ((data.ping) + 1) * 255;
        r = Math.min(Math.max(r, 0), 255);
        g = Math.min(Math.max(g, 0), 255);
        b = Math.min(Math.max(b, 0), 255);
        return this.toHex(Math.round(r), Math.round(g), Math.round(b));
    }

    toHex(r: number, g: number, b: number): string {
        return "#" + this.compToHex(r) + this.compToHex(g) + this.compToHex(b);
    }

    compToHex(c: number): string {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

}