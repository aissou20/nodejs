"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgsParser = void 0;
var net_1 = require("net");
var ArgsParser = /** @class */ (function () {
    function ArgsParser(argv) {
    }
    ArgsParser.prototype.isServer = function () {
        return process.argv.indexOf("server") !== -1;
    };
    ArgsParser.prototype.getAddress = function () {
        // isIPv4
        //on doit itérer sur tout les paramètre
        // et vérifier si l'adresse est valide
        for (var _i = 0, _a = process.argv; _i < _a.length; _i++) {
            var elt = _a[_i];
            if ((0, net_1.isIPv4)(elt)) {
                return elt;
            }
        }
        /* if (process.argv.length > 2) {
              adresse = process.argv[2];
            // console.log("adresse", adresse);
             return adresse;
         }*/
        return false;
    };
    ArgsParser.prototype.getListeningPort = function () {
        var numPort = 23456;
        if (numPort <= 10000 && numPort >= 65535) {
            return numPort;
        }
        return numPort;
    };
    return ArgsParser;
}());
exports.ArgsParser = ArgsParser;
