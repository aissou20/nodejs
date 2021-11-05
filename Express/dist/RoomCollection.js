"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = void 0;
var Rooms = /** @class */ (function () {
    function Rooms() {
        this.rooms = {};
        this._ids = [];
        this.nextIdx = 0;
    }
    Object.defineProperty(Rooms.prototype, "all", {
        get: function () {
            return this._ids;
        },
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    Rooms.prototype.add = function (room) {
        if (this._ids.indexOf(room.id) == -1) {
            this._ids.push(room.id);
            this.rooms[room.id] = room;
        }
    };
    Rooms.prototype.del = function (id) {
        if (this._ids.indexOf(id) !== -1) {
            this._ids = this._ids.filter(function (ids) { return ids !== id; });
        }
    };
    Rooms.prototype.get = function (id) {
        if (id in this.rooms) {
            return this.rooms[id];
        }
        return false;
    };
    Rooms.prototype.next = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.nextIdx < this._ids.length) {
            var ret = { value: this.rooms[this._ids[this.nextIdx]], done: false };
            this.nextIdx++;
            return ret;
        }
        this.nextIdx = 0;
        return { value: undefined, done: true };
    };
    return Rooms;
}());
exports.Rooms = Rooms;
