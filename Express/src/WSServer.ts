import {Server as SocketIOServer, Socket} from "socket.io";
import * as http from "http";
import {IUserCollection, Users} from "./UserCollection";
import {IRoomCollection, Rooms} from "./RoomCollection";
import {User} from "./User";
import {Room} from "./Room";
import {v4 as uuid} from "uuid";

export interface IWSServerConfig {
    /**
     * Instance du Serveur HTTP renvoyé par http.createServer()
     *
     * @type {http.Server}
     * @memberof IWSServerConfig
     */
    httpSrv: http.Server
    /**
     * Eventuelle fonctione de log customisée.
     * Si aucune fonction n'est fournie, utiliser console.log
     *
     * @memberof IWSServerConfig
     */
    log?: (...args: Array<any>) => void
}

export interface IWSServer {
    /**
     * Instance du serveur renvoyé par Socket.IO
     *
     * @type {SocketIOServer}
     * @memberof IWSServer
     */
    readonly server: SocketIOServer
    /**
     * Liste des utilisateurs en ligne
     *
     * @type {IUserCollection}
     * @memberof IWSServer
     */
    readonly onlineUsers: IUserCollection
    /**
     * Liste des salons connus du serveur
     *
     * @type {IRoomCollection}
     * @memberof IWSServer
     */
    readonly rooms: IRoomCollection
}

export class WSServer implements IWSServer {
    readonly onlineUsers: IUserCollection;
    readonly rooms: IRoomCollection;
    readonly server: SocketIOServer;


    constructor(config: IWSServerConfig) {
        this.onlineUsers = new Users();
        this.rooms = new Rooms();
        this.server = new SocketIOServer(config.httpSrv);

        this.server.on("connection", (socket: Socket) => {
            console.log("un utilisateur s'est connecté")





            const user = new User({
                id: socket.id,
                collection: this.onlineUsers,
                pseudo: "Utilisateur test",
                imgUrl: "image url",
            })
            console.log("user__", user)

            const room = new Room({
                id: uuid(),
                title: "Salon1",
                urlImage:"une url de l'image",
                usersCollection: this.onlineUsers,
            });


            this.onlineUsers.add(user);
            const getUserInfo = this.buildUserInfo()
            user.joinRoom(socket.id);

            this.rooms.add(room);
            const getRoomInfo = this.buildRoomInfo()
            room.joinUser(room.id)


           /* const userList = this.onlineUsers;
            console.log(userList)
            const roomList = this.rooms.all;*/


            socket.emit("userList", getUserInfo);
            socket.broadcast.emit("userList", getUserInfo);

            socket.emit("roomList", getRoomInfo);
            socket.broadcast.emit("roomList", getRoomInfo);

            console.log('userList', getUserInfo);
            console.log('roomList', getRoomInfo);

            socket.on("disconnect", (reason: string) => {
                console.log("utilisateur déconnecté")
                if (reason) {
                    console.log(`pour la raison suivante ${reason}`)
                }
                /* disconnect */
                this.onlineUsers.del(socket.id)
                const getUserInfo = this.buildUserInfo()
                socket.broadcast.emit("userList", getUserInfo);

                this.rooms.del(room.id)
                const getRoomInfo = this.buildRoomInfo()
                socket.broadcast.emit("roomList", getRoomInfo);
            })

            socket.on("chat", (msg: string) => {
                console.log(`Message du canal de chat: ${msg}`)
                socket.emit("chat", `vous avez écrit ${msg}`)
            })
        })
    }

    buildUserInfo() {
        return this.onlineUsers.all.map((id) => {
            let user = this.onlineUsers.get(id);
            if (user) {
                return {
                    id: id,
                    pseudo: user.pseudo
                }
            }
            return false
        }).filter((user) => {
            return typeof user !== "boolean"
        });

    }

    buildRoomInfo() {
        return this.rooms.all.map((id) => {
            let room = this.rooms.get(id);
            if (room) {
                return {
                    id: id,
                    title: room.title,
                    urlImage: room.urlImage,
                }
            }
            return false
        }).filter((room) => {
            return typeof room !== "boolean"
        });

    }

    //
}