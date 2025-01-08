const http = require('http'); //This is a built-in Node.js module that allows us to create an HTTP server. HTTP servers handle web requests,
const express = require('express');
const { Server } = require("socket.io");
const path = require('path'); // It helps with handling and transforming file paths. It’s useful when working with files in different directories.

const app = express(); // This creates an instance of an Express app.
const server = http.createServer(app); //we're creating an HTTP server using the http module, and we're passing the app (the Express app) into it. This means that the Express app will handle all incoming HTTP requests through this server.
const io = new Server(server);

io.on('connection', (socket) => { //This is an event listener that listens for new WebSocket connections from clients. When a client connects to the server, the server triggers this event, and the callback function is executed.
    console.log('A user connected');

    
    socket.on("user-message", (message) => {
        console.log('A new user message: ', message);
        
        
        io.emit("message", message); 
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


app.use(express.static(path.resolve('./public')));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve('./public/index.html'));
});

server.listen(9000, () => {
    console.log("Server started at port 9000");
});
