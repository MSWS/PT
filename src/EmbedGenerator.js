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
exports.EmbedGenerator = void 0;
var discord_js_1 = require("discord.js");
var EmbedGenerator = /** @class */ (function () {
    function EmbedGenerator() {
    }
    EmbedGenerator.prototype.generateMessage = function (data) {
        var e_1, _a, e_2, _b, e_3, _c;
        var embed = new discord_js_1.MessageEmbed({});
        embed.setTitle(data.sourceName.length == 0 ? data.name : data.sourceName);
        var len = 0;
        var desc = "";
        try {
            for (var _d = __values(data.players.sort()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var player = _e.value;
                if (len + player.length > 65) {
                    desc = desc.substring(0, desc.length - 2);
                    desc += "\n";
                    len = 0;
                }
                desc += player + ", ";
                len += (player + ", ").length;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d["return"])) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (desc.length > 2)
            desc = desc.substring(0, desc.length - 2);
        embed.setDescription(desc);
        embed.setColor(this.getColor(data));
        console.log("Setting color to %s", this.getColor(data));
        embed.addField("Players", data.players.length + "/" + data.max, true);
        embed.addField("Map", data.map, true);
        var footer = "";
        if (data.joined.length > 0) {
            footer += "[+] ";
            try {
                for (var _f = __values(data.joined), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var p = _g.value;
                    footer += p + ", ";
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f["return"])) _b.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
            footer = footer.substring(0, footer.length - 2);
        }
        if (data.left.length > 0) {
            footer += "[-] ";
            try {
                for (var _h = __values(data.left), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var p = _j.value;
                    footer += p + ", ";
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h["return"])) _c.call(_h);
                }
                finally { if (e_3) throw e_3.error; }
            }
            footer = footer.substring(0, footer.length - 2);
        }
        embed.setFooter(footer.length != 0 ? footer + "\n" + data.ip : data.ip);
        embed.setTimestamp(Date.now());
        return embed;
    };
    EmbedGenerator.prototype.getColor = function (data) {
        var percent = data.players.length / data.max;
        var r = (percent * 255);
        var g = Math.cos((data.map.length) + 1) * 255;
        var b = ((data.ping) + 1) * 255;
        r = Math.min(Math.max(r, 0), 255);
        g = Math.min(Math.max(g, 0), 255);
        b = Math.min(Math.max(b, 0), 255);
        return this.toHex(Math.round(r), Math.round(g), Math.round(b));
    };
    EmbedGenerator.prototype.toHex = function (r, g, b) {
        return "#" + this.compToHex(r) + this.compToHex(g) + this.compToHex(b);
    };
    EmbedGenerator.prototype.compToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    return EmbedGenerator;
}());
exports.EmbedGenerator = EmbedGenerator;
