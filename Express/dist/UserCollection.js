"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var Users = /** @class */ (function () {
    function Users() {
        this._users = {};
        this._ids = [];
        this.nextIdx = 0;
    }
    Object.defineProperty(Users.prototype, "all", {
        get: function () {
            return this._ids;
        },
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    Users.prototype.add = function (user) {
        if (this._ids.indexOf(user.id) == -1) {
            this._ids.push(user.id);
            this._users[user.id] = user;
        }
        // if (!(user.id in this._users)) {
        //     this._ids.push(user.id)
        // }
    };
    Users.prototype.del = function (id) {
        if (this._ids.indexOf(id) !== -1) {
            this._ids = this._ids.filter(function (ids) { return ids !== id; });
        }
    };
    Users.prototype.get = function (id) {
        if (id in this._users) {
            return this._users[id];
        }
        return false;
    };
    /* next(...args: [] | [any]): { value: IUser, done?: false } | { value?: IUser, done: true } {
         const currentId = this.nextIdx;
         this.nextIdx++;
         if (this.nextIdx >= this._ids.length) {
             this.nextIdx = 0;
             return {value: this._users[currentId], done: true}
         }
         return {value: this._users[currentId], done: false}
     }*/
    Users.prototype.next = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.nextIdx < this._ids.length) {
            var ret = { value: this._users[this._ids[this.nextIdx]], done: false };
            this.nextIdx++;
            return ret;
        }
        this.nextIdx = 0;
        return { value: undefined, done: true };
    };
    return Users;
}());
exports.Users = Users;
