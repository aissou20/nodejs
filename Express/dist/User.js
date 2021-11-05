"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(config) {
        this.collection = config.collection;
        this._rooms = [];
        this._pseudo = config.pseudo;
        this._imgUrl = config.imgUrl;
        this.id = config.id;
    }
    Object.defineProperty(User.prototype, "pseudo", {
        get: function () {
            return this._pseudo;
        },
        /**
         * on en aura pas besoin car  c'est à vide
         */
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "imgUrl", {
        get: function () {
            return this._imgUrl;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "rooms", {
        get: function () {
            return this._rooms;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.joinRoom = function (roomId) {
        if (this.rooms.indexOf(roomId) == -1) {
            this.rooms.push(roomId);
        }
    };
    User.prototype.leaveRoom = function (roomId) {
        if (this.rooms.indexOf(roomId) !== -1) {
            this.rooms = this.rooms.filter(function (id) { return roomId !== id; });
        }
    };
    return User;
}());
exports.User = User;
