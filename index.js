const http = require('http');
const express = require('express');
const {Server} =require("socket.io");
//now we are using websocket after installing it 
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A new user has connected ', socket.id);
})
//socket is our users client

app.use(express.static(path.resolve('./public'))); 

app.get("/", (req,res) => {
    return res.sendFile("/public/index.html");
})

server.listen(9000, () => {
    console.log("Server started at port 9000")
})