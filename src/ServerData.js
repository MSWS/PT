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
exports.ServerData = void 0;
var ServerData = /** @class */ (function () {
    function ServerData(data) {
        this.name = "";
        this.sourceName = "";
        this.ip = "";
        this.channel = "";
        this.players = [];
        this.joined = [];
        this.left = [];
        this.max = 64;
        this.message = "";
        this.map = "Unknown";
        this.ping = 0;
        this.name = data.name;
        this.ip = data.ip;
        this.channel = data.channel;
    }
    ServerData.prototype.update = function (data) {
        var e_1, _a, e_2, _b;
        if (this.sourceName.length == 0 && data.sourceName.length != 0)
            this.sourceName = data.sourceName;
        this.map = data.map;
        this.max = data.max;
        this.ping = data.ping;
        this.joined = [];
        this.left = [];
        try {
            for (var _c = __values(data.players), _d = _c.next(); !_d.done; _d = _c.next()) {
                var p = _d.value;
                if (!this.players.includes(p)) {
                    this.joined.push(p);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _e = __values(this.players), _f = _e.next(); !_f.done; _f = _e.next()) {
                var p = _f.value;
                if (!data.players.includes(p)) {
                    this.left.push(p);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.players = data.players;
    };
    return ServerData;
}());
exports.ServerData = ServerData;
