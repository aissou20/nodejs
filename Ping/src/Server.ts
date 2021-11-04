import * as net from "net";

export interface IServer {
    /**
     * Numéro de port sur lequel écoutera le serveur
     * Cette valeur est initialisée par le constructeur doit être en lecture seule au runtime
     *
     * @type {number}
     * @memberof IServer
     */
    readonly listeningPort: number
    /**
     * Fonction à utiliser pour logger les évènements du serveur
     * Cette valeur est initialisée par le constructeur doit être en lecture seule au runtime
     *
     * @type { Function }
     * @memberof IServer
     */
    readonly log: (...args: Array<any>) => void
    /**
     * Fonction à utiliser pour logger les évènements d'erreur du serveur
     * Cette valeur est initialisée par le constructeur doit être en lecture seule au runtime
     *
     * @type { Function }
     * @memberof IServer
     */
    readonly error: (...args: Array<any>) => void

    /**
     * Méthode d'écoute du serveur
     * Son appel provoque l'écoute sur le port fournit du serveur
     *
     * @memberof IServer
     */
    listen(): void

    /**
     * Arrête l'écoute du serveur.
     * Après cet appel, plus aucune connexion ne sera acceptée
     *
     * @memberof IServer
     */
    close(): void

    /**
     * Méthode implémentant le comportement du serveur lors de la réception d'un message sur le réseau
     * Cette valeur est initialisée par le constructeur doit être en lecture seule au runtime
     *
     * @type { Function }
     * @memberof IServer
     */
    readonly onData: (data: string) => void
}

export class Server implements IServer {
    public server;

    constructor(listeningPort: number) {
        this.listeningPort = listeningPort;

        //creation du sever
        this.server = net.createServer((c) => {
            // 'connection' listener.
            console.log('client connecté');
        });
    }

    readonly listeningPort: number;


    close(): void {
        this.server.close();
    }
    //this.listeningPort,

    listen(): void {
        this.server.listen((socket :net.Socket)=> {

            socket.on('data',(data:string)=>{
                this.onData(data);
            });
            socket.on('end', () => {
                console.log('client déconnecté');
            });
            console.log('server bound');
        });
    }


    // @ts-ignore
    readonly error(args: any): void {
    }

    // @ts-ignore
    readonly log(args: any): void {
    }

    // @ts-ignore
    readonly onData(data: string): void {
    }


}

//date.now()