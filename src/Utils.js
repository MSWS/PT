"use strict";
exports.__esModule = true;
exports.getTextChannel = exports.getChannel = exports.sendMessageID = exports.sendMessage = void 0;
var discord_js_1 = require("discord.js");
var _1 = require(".");
var messages = new Map();
function sendMessage(channel, msg, data) {
    var _a;
    if (messages.has(data.name)) {
        (_a = messages.get(data.name)) === null || _a === void 0 ? void 0 : _a.fetch().then(function (m) {
            if (m == null) {
                if (msg instanceof discord_js_1.MessagePayload) {
                    channel.send(msg).then(function (msg) { return messages.set(data.name, msg); });
                }
                else if (msg instanceof discord_js_1.MessageEmbed) {
                    channel.send({ embeds: [msg] }).then(function (m) { return messages.set(data.name, m); });
                }
                return;
            }
            if (msg instanceof discord_js_1.MessagePayload) {
                m.edit(msg);
            }
            else if (msg instanceof discord_js_1.MessageEmbed) {
                m.edit({ embeds: [msg] });
            }
        });
        return;
    }
    if (msg instanceof discord_js_1.MessagePayload) {
        channel.send(msg).then(function (msg) { return messages.set(data.name, msg); });
    }
    else if (msg instanceof discord_js_1.MessageEmbed) {
        channel.send({ embeds: [msg] }).then(function (m) { return messages.set(data.name, m); });
    }
}
exports.sendMessage = sendMessage;
function sendMessageID(id, msg, data) {
    var chan = getTextChannel(id);
    if (chan != undefined)
        sendMessage(chan, msg, data);
}
exports.sendMessageID = sendMessageID;
function getChannel(id) {
    var chan = _1.client.channels.cache.get(id);
    if (chan == null)
        console.error("Invalid channel: " + id);
    return chan;
}
exports.getChannel = getChannel;
function getTextChannel(id) {
    var chan = getChannel(id);
    if (!(chan === null || chan === void 0 ? void 0 : chan.isText) || (chan === null || chan === void 0 ? void 0 : chan.type) != "GUILD_TEXT") {
        console.error("Invalid channel: " + id);
        return undefined;
    }
    return chan;
}
exports.getTextChannel = getTextChannel;
