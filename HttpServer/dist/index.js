"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
// Create a local server to receive data from
/*const server = http.createServer((req, res) => {
    res.end("hello world")
});

server.listen(8000);*/
/*
envoie en json*/
var server = http_1.default.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: 'Hello World!'
    }));
});
server.listen(8000);
