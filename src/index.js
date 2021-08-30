"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.getMessenger = exports.client = exports.generator = void 0;
var discord_js_1 = require("discord.js");
var EmbedGenerator_1 = require("./EmbedGenerator");
var Messenger_1 = require("./Messenger");
var ServerData_1 = require("./ServerData");
var Updater_1 = require("./Updater");
require("dotenv").config();
var config = require("./config.json");
exports.generator = new EmbedGenerator_1.EmbedGenerator();
exports.client = new discord_js_1.Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES]
});
var messengerMap = new Map();
var servers = loadConfig();
login();
function login() {
    exports.client.login(process.env.TOKEN);
    exports.client.on("ready", function () {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        var _e;
        (_e = exports.client.user) === null || _e === void 0 ? void 0 : _e.setPresence({
            status: "online",
            activities: [{ name: "Source Servers", type: "WATCHING" }]
        });
        try {
            for (var _f = __values(servers.keys()), _g = _f.next(); !_g.done; _g = _f.next()) {
                var channel = _g.value;
                var c = servers.get(channel);
                if (c != undefined) {
                    var mn = new Messenger_1.Messenger(c);
                    try {
                        for (var c_1 = (e_2 = void 0, __values(c)), c_1_1 = c_1.next(); !c_1_1.done; c_1_1 = c_1.next()) {
                            var server = c_1_1.value;
                            messengerMap.set(server.name, mn);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (c_1_1 && !c_1_1.done && (_b = c_1["return"])) _b.call(c_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    new Messenger_1.Messenger(c).start(10000);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f["return"])) _a.call(_f);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _h = __values(servers.values()), _j = _h.next(); !_j.done; _j = _h.next()) {
                var sd = _j.value;
                try {
                    for (var sd_1 = (e_4 = void 0, __values(sd)), sd_1_1 = sd_1.next(); !sd_1_1.done; sd_1_1 = sd_1.next()) {
                        var server = sd_1_1.value;
                        new Updater_1.Updater(server).start(10000);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (sd_1_1 && !sd_1_1.done && (_d = sd_1["return"])) _d.call(sd_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_c = _h["return"])) _c.call(_h);
            }
            finally { if (e_3) throw e_3.error; }
        }
    });
}
function loadConfig() {
    var e_5, _a;
    var map = new Map();
    try {
        for (var _b = __values(config.servers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            var data = new ServerData_1.ServerData(entry);
            var servers_1 = void 0;
            var tmp = map.get(data.channel);
            if (tmp != undefined && tmp != null)
                servers_1 = tmp;
            else
                servers_1 = [];
            servers_1.push(data);
            map.set(data.channel, servers_1);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return map;
}
function getMessenger(name) {
    return messengerMap.get(name);
}
exports.getMessenger = getMessenger;
