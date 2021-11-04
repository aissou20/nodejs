import http from "http";


// Create a local server to receive data from
/*const server = http.createServer((req, res) => {
    res.end("hello world")
});

server.listen(8000);*/
/*
envoie en json*/
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        data: 'Hello World!'
    }));
});

server.listen(8000);
