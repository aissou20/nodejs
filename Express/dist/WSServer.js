"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSServer = void 0;
var socket_io_1 = require("socket.io");
var UserCollection_1 = require("./UserCollection");
var User_1 = require("./User");
var WSServer = /** @class */ (function () {
    function WSServer(config) {
        var _this = this;
        this.onlineUsers = new UserCollection_1.Users();
        this.rooms = [];
        this.server = new socket_io_1.Server(config.httpSrv);
        this.server.on("connection", function (socket) {
            console.log("un utilisateur s'est connecté");
            var user = new User_1.User({
                id: socket.id,
                collection: _this.onlineUsers,
            });
            _this.onlineUsers.add(user);
            var userList = _this.onlineUsers.all;
            socket.emit("userList", userList);
            socket.broadcast.emit("userList", userList);
            console.log('userlist', userList);
            socket.on("disconnect", function (reason) {
                console.log("utilisateur déconnecté");
                if (reason) {
                    console.log("pour la raison suivante " + reason);
                }
                _this.onlineUsers.del(socket.id);
                var userList = _this.onlineUsers.all;
                socket.broadcast.emit("userList", userList);
            });
            socket.on("chat", function (msg) {
                console.log("Message du canal de chat: " + msg);
                socket.emit("chat", "vous avez \u00E9crit " + msg);
            });
        });
    }
    return WSServer;
}());
exports.WSServer = WSServer;
