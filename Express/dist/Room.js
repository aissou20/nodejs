"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
var Room = /** @class */ (function () {
    function Room(config) {
        this.adminId = config.adminId || false;
        this.id = config.id;
        this._joinedUsers = [];
        this.title = config.title;
        this.public = !!config.adminId;
        this.urlImage = config.urlImage || false;
        this.usersCollection = config.usersCollection;
    }
    Object.defineProperty(Room.prototype, "joinedUsers", {
        get: function () {
            return this._joinedUsers;
        },
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    Room.prototype.joinUser = function (userId) {
        if (this.usersCollection.all.indexOf(userId) !== -1) {
            if (this._joinedUsers.indexOf(userId) == -1) {
                this._joinedUsers.push(userId);
                return true;
            }
        }
        return false;
    };
    Room.prototype.leaveUser = function (userId) {
        if (this._joinedUsers.indexOf(userId) !== -1) {
            this._joinedUsers = this._joinedUsers.filter(function (id) { return userId !== id; });
        }
    };
    return Room;
}());
exports.Room = Room;
