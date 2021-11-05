"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSServer = void 0;
var socket_io_1 = require("socket.io");
var UserCollection_1 = require("./UserCollection");
var RoomCollection_1 = require("./RoomCollection");
var User_1 = require("./User");
var Room_1 = require("./Room");
var uuid_1 = require("uuid");
var WSServer = /** @class */ (function () {
    function WSServer(config) {
        var _this = this;
        this.onlineUsers = new UserCollection_1.Users();
        this.rooms = new RoomCollection_1.Rooms();
        this.server = new socket_io_1.Server(config.httpSrv);
        this.server.on("connection", function (socket) {
            console.log("un utilisateur s'est connecté");
            var user = new User_1.User({
                id: socket.id,
                collection: _this.onlineUsers,
                pseudo: "Utilisateur test",
                imgUrl: "image url",
            });
            var user1 = new User_1.User({
                id: socket.id,
                collection: _this.onlineUsers,
                pseudo: "Utilisateur 1",
                imgUrl: "image url 1",
            });
            console.log("user__", user);
            var room = new Room_1.Room({
                id: (0, uuid_1.v4)(),
                title: "Salon1",
                urlImage: "une url de l'image",
                usersCollection: _this.onlineUsers,
            });
            _this.onlineUsers.add(user);
            _this.onlineUsers.add(user1);
            var getUserInfo = _this.buildUserInfo();
            user.joinRoom(socket.id);
            _this.rooms.add(room);
            var getRoomInfo = _this.buildRoomInfo();
            room.joinUser(room.id);
            socket.emit("userList", getUserInfo);
            socket.broadcast.emit("userList", getUserInfo);
            socket.emit("roomList", getRoomInfo);
            socket.broadcast.emit("roomList", getRoomInfo);
            //console.log('userList', getUserInfo);
            //console.log('roomList', getRoomInfo);
            socket.on("disconnect", function (reason) {
                console.log("utilisateur déconnecté");
                if (reason) {
                    console.log("pour la raison suivante " + reason);
                }
                /* disconnect */
                _this.onlineUsers.del(socket.id);
                var getUserInfo = _this.buildUserInfo();
                socket.broadcast.emit("userList", getUserInfo);
                _this.rooms.del(room.id);
                var getRoomInfo = _this.buildRoomInfo();
                socket.broadcast.emit("roomList", getRoomInfo);
            });
            socket.on("chat", function (msg) {
                console.log("Message du canal de chat: " + msg);
                socket.emit("chat", "vous avez \u00E9crit " + msg);
            });
        });
    }
    WSServer.prototype.buildUserInfo = function () {
        var _this = this;
        return this.onlineUsers.all.map(function (id) {
            var user = _this.onlineUsers.get(id);
            if (user) {
                return {
                    id: id,
                    pseudo: user.pseudo
                };
            }
            return false;
        }).filter(function (user) {
            return typeof user !== "boolean";
        });
    };
    WSServer.prototype.buildRoomInfo = function () {
        var _this = this;
        return this.rooms.all.map(function (id) {
            var room = _this.rooms.get(id);
            if (room) {
                return {
                    id: id,
                    title: room.title,
                    urlImage: room.urlImage,
                };
            }
            return false;
        }).filter(function (room) {
            return typeof room !== "boolean";
        });
    };
    return WSServer;
}());
exports.WSServer = WSServer;
