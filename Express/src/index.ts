import express from "express";
import * as fs from "fs";
import path from "path";
import {Server, Socket} from "socket.io";
import * as http from "http";
import {WSServer} from "./WSServer";

//console.log("coucou")
/*const srv = express();
srv.get('/bonjour/:prenom', (req, res) => {
    const txt = `Bonjour ${req.params["prenom"]}`
    res.send(txt)
})
//renvoie un fichier
srv.get('/sources/:file', (req, res) => {
    const stream = fs.createReadStream(__dirname + "/" + req.params["file"], "utf8")
    res.setHeader("toto","test du header")
    stream.pipe(res);
})
srv.listen(3000)*/

const webSrv = express();
const httpSrv = http.createServer(webSrv);
const wsSrv = new WSServer({httpSrv});

webSrv.get('/bonjour/:prenom', (req, res) => {
    const txt = `Bonjour ${req.params["prenom"]}`
    res.send(txt)
})

webSrv.get('/sources/:file', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", req.params["file"]))
})


const port: number = 3000;
httpSrv.listen(port, () => {
    console.log(`Serveur en écoute sur ${port} ...`)
})

/*wsSrv.on("connection", (socket: Socket) => {
    console.log("un utilisateur s'est connecté")
    socket.on("disconnect", (reason: string) => {
        console.log("utilisateur déconnecté")
        if (reason) {
            console.log(`pour la raison suivante ${reason}`)
        }
    })
    socket.on("chat", (msg: string) => {
        console.log(`Message du canal de chat: ${msg}`)
        socket.emit("chat", `vous avez écrit ${msg}`)
    })
})*/
