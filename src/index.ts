import { Client, Intents } from "discord.js";
import { EmbedGenerator } from "./EmbedGenerator";
import { Generator } from "./Generator";
import { Messenger } from "./Messenger";
import { ServerData } from "./ServerData";
import { Updater } from "./Updater";
require("dotenv").config();
let config = require("./config.json");

export let generator: Generator = new EmbedGenerator();
export const client = new Client({
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
let messengerMap = new Map<string, Messenger>();

let servers = loadConfig();

login();

function login() {
  client.login(process.env.TOKEN);

  client.on("ready", () => {
    client.user?.setPresence({
      status: "online",
      activities: [{ name: "Source Servers", type: "WATCHING" }]
    });

    for (let channel of servers.keys()) {
      let c = servers.get(channel);
      if (c != undefined) {
        let mn = new Messenger(c);

        for (let server of c) {
          messengerMap.set(server.name, mn);
        }
        new Messenger(c).start(10000);
      }
    }
    for (let sd of servers.values()) {
      for (let server of sd) {
        new Updater(server).start(10000);
      }
    }
  });
}

function loadConfig(): Map<string, ServerData[]> {
  let map = new Map<string, ServerData[]>();
  for (let entry of config.servers) {
    let data: ServerData = new ServerData(entry);
    let servers: ServerData[];
    let tmp = map.get(data.channel);
    if (tmp != undefined && tmp != null)
      servers = tmp;
    else
      servers = [];
    servers.push(data);
    map.set(data.channel, servers);
  }
  return map;
}

export function getMessenger(name: string): Messenger | undefined {
  return messengerMap.get(name);
}