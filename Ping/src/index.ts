import process from 'process';
import {IArgsParser, ArgsParser} from "./ArgsParser";
import {IServer, Server} from "./Server";
import {Client, IClient} from "./Client";

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
const argsParser: IArgsParser = new ArgsParser(process.argv);

if (argsParser.isServer()) {
    const listeningPort: number = argsParser.getListeningPort();
    console.log(`Essaie d'écouter sur 127.0.0.1 :${listeningPort}`);


    // @ts-ignore
    const server: IServer = new Server({
        listeningPort,
        onData: (data: string) => {
            console.log(`Data :"${data}"`);
        }
    })
    server.listen();
    console.log(`Server listening on 127.0.0.1: ${listeningPort}`)
} else {
    // @ts-ignore
    const address: string | false = argsParser.getAddress();

    if (address) {
        // @ts-ignore
        const client: IClient = new Client({
            port: 23456,
            address
        })
        client.ping().then((delay: number | false) => {
            console.log(`delay ${delay} ms`)
        })
        // console.log(`vous voulez pinguer l'adresse ${address}`);
    } else {
        console.error("Merci de fournir une adresse IPV4 à pinguer");
    }
}


