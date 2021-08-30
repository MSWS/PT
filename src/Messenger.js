"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.Messenger = void 0;
var _1 = require(".");
var Utils_1 = require("./Utils");
var Messenger = /** @class */ (function () {
    function Messenger(servers) {
        var e_1, _a;
        var _this = this;
        this.lastUpdate = 0;
        this.data = new Map();
        this.messages = new Map();
        this.cancelled = false;
        servers.forEach(function (c) {
            var channels = _this.data.get(c.channel);
            if (channels == null)
                channels = [];
            channels.push(c);
            _this.data.set(c.channel, channels);
        });
        if (this.data.size != 1) {
            console.warn("Timer was created with " + this.data.size + " channels.");
            console.warn("This is usually unintended, each timer should only have 1 channel.");
        }
        try {
            for (var _b = __values(this.data.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var c = _c.value;
                this.purge(c);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    Messenger.prototype.purge = function (channel) {
        return __awaiter(this, void 0, void 0, function () {
            var chan;
            return __generator(this, function (_a) {
                chan = (0, Utils_1.getTextChannel)(channel);
                chan.bulkDelete(100);
                return [2 /*return*/];
            });
        });
    };
    Messenger.prototype.send = function (data) {
        if (!this.hasServerData(data))
            console.warn("Sending server data " + data.channel + " that we aren't responsible for it!");
        (0, Utils_1.sendMessageID)(data.channel, _1.generator.generateMessage(data), data);
    };
    Messenger.prototype.hasServerData = function (data) {
        var e_2, _a, e_3, _b;
        try {
            for (var _c = __values(this.data.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var svs = _d.value;
                try {
                    for (var svs_1 = (e_3 = void 0, __values(svs)), svs_1_1 = svs_1.next(); !svs_1_1.done; svs_1_1 = svs_1.next()) {
                        var server = svs_1_1.value;
                        if (server.name == data.name)
                            return true;
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (svs_1_1 && !svs_1_1.done && (_b = svs_1["return"])) _b.call(svs_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    };
    Messenger.prototype.cancel = function () {
        this.cancelled = true;
    };
    Messenger.prototype.update = function (data) {
        if (!this.hasServerData(data)) {
            console.warn("Attempted to save " + data.channel + " when we aren't responsible for it.");
            return;
        }
        var ds = this.data.get(data.channel);
        if (ds == undefined)
            ds = [];
        ds = ds.filter(function (e) { return e.name === data.name; });
        this.data.set(data.channel, ds);
    };
    Messenger.prototype.start = function (rate) {
        var _this = this;
        if (this.cancelled)
            return;
        setTimeout(function () {
            var e_4, _a;
            if (_this.cancelled)
                return;
            try {
                for (var _b = __values(_this.data.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var data = _c.value;
                    data.forEach(function (d) { return _this.send(d); });
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            _this.start(rate);
        }, rate);
        console.log(this.data);
    };
    return Messenger;
}());
exports.Messenger = Messenger;
