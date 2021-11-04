"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var http = __importStar(require("http"));
var WSServer_1 = require("./WSServer");
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
var webSrv = (0, express_1.default)();
var httpSrv = http.createServer(webSrv);
var wsSrv = new WSServer_1.WSServer({ httpSrv: httpSrv });
webSrv.get('/bonjour/:prenom', function (req, res) {
    var txt = "Bonjour " + req.params["prenom"];
    res.send(txt);
});
webSrv.get('/sources/:file', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "..", "public", req.params["file"]));
});
var port = 3000;
httpSrv.listen(port, function () {
    console.log("Serveur en \u00E9coute sur " + port + " ...");
});
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
