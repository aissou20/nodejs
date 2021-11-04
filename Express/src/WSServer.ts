import {Server as SocketIOServer, Socket} from "socket.io";
import * as http from "http";
import {IUserCollection, Users} from "./UserCollection";
import {IRoomCollection} from "./RoomCollection";
import {User} from "./User";

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
    readonly rooms: any;
    readonly server: SocketIOServer;


    constructor(config: IWSServerConfig) {
        this.onlineUsers = new Users();
        this.rooms = [];
        this.server = new SocketIOServer(config.httpSrv);

        this.server.on("connection", (socket: Socket) => {
            console.log("un utilisateur s'est connecté")

            const user = new User({
                id:socket.id,
                collection:this.onlineUsers,
            })

            this.onlineUsers.add(user);

            const userList = this.onlineUsers.all;

            socket.emit("userList", userList);
            socket.broadcast.emit("userList", userList);
            console.log('userList',userList);

            socket.on("disconnect", (reason: string) => {
                console.log("utilisateur déconnecté")

                if (reason) {
                    console.log(`pour la raison suivante ${reason}`)
                }
                this.onlineUsers.del(socket.id)
                const userList = this.onlineUsers.all;
                socket.broadcast.emit("userList", userList);

            })
            socket.on("chat", (msg: string) => {
                console.log(`Message du canal de chat: ${msg}`)
                socket.emit("chat", `vous avez écrit ${msg}`)
            })
        })
    }
}