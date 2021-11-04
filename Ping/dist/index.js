"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = __importDefault(require("process"));
var ArgsParser_1 = require("./ArgsParser");
/*process.argv;
//console.log(process.argv);
//process.argv.indexOf("server");
//console.log(process.argv.indexOf("server"));

const isServer: boolean = process.argv.indexOf("server") !== -1;
//console.log(process.argv.indexOf("server"));

if (isServer) {
    //code server
} else if (process.argv.length > 2) {
    //code client
    const adresse = process.argv[2];
    console.log("adresse", adresse);
} else {
    //error
    console.error("merci de préciser une adresse a pinger")
}*/
//
var argsParser = new ArgsParser_1.ArgsParser(process_1.default.argv);
if (argsParser.isServer()) {
    var port = argsParser.getListeningPort();
    console.log("Essaie d'\u00E9couter sur 127.0.0.1 :" + port);
}
else {
    // @ts-ignore
    var address = argsParser.getAddress();
    if (address) {
        console.log("vous voulez pinguer l'adresse " + address);
    }
    else {
        console.error("Merci de fournir une adresse IPV4 à pinguer");
    }
}
