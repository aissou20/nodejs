import {isIPv4} from "net";

export interface IArgsParser {
    /**
     * Le programme a-t-il été appelé en tant que Serveur ?
     * Le programme a été appelé en tant que serveur si l'argument "server" est présent au moins une fois sur la ligne de commande.
     *
     * @returns {boolean} True si oui, Faux sinon
     * @membered IArgsParser
     */
    isServer(): boolean

    /**
     * Renvoie le numéro de port sur lequel écouter les connexions entrantes
     * La valeur est le premier nombre compris entre 10000 et 65535 qui aura été éventuellement transmis sur la ligne de commande.
     * Si aucune valeur transmise, la valeur par défaut est 23456
     *
     * @returns {number}
     * @memberof IArgsParser
     */
    getListeningPort(): number

    /**
     * Renvoie la première adresse IPv4 transmise sur la ligne de commande.
     * Si aucune adresse IPv4 n'a été transmise sur la ligne de commande, renvoyer FALSE
     *
     * @returns { number | false }
     * @memberof IArgsParser
     */
    getAddress(): string | false | undefined
}

export class ArgsParser implements IArgsParser {

    constructor(argv: string[]) {

    }

    isServer(): boolean {
        return process.argv.indexOf("server") !== -1;
    }

    getAddress(): string | false {
        // isIPv4
        //on doit itérer sur tout les paramètre
        // et vérifier si l'adresse est valide

        for (let elt of process.argv) {
            if (isIPv4(elt)) {
                return elt;
            }
        }
        return false;
    }


    getListeningPort(): number {

        const regex = new RegExp("/[0-9]/+/g");

        const numPort = 23456;
        // vérifer si c'est un nombre avec une regex
        // puis vérifier si c'est compris entre 10000 et 25535
        //et return

        for (let elt of process.argv){
            if(elt.match(regex)){
                console.log("elt est un nombre")
                if (numPort <= 10000 && numPort >= 65535) {
                    return numPort;
                }
            }

        }
        return numPort;
    }


}