const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

server.listen(9000, () => {
    console.log("Server started at port 9000")
})