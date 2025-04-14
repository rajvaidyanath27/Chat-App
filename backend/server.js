const express = require('express');
const { chats }  = require('./data.js');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('API is running successfully but bc data??...');
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
}
);

app.get('/api/chat/:id', (req,res) => {
    const singlechat = chats.find((c) => c._id == req.params.id);
    res.send(singlechat);
})


const PORT = process.env.PORT ||5000;

app.listen(`${PORT}`, () => {
    console.log(`Server is running on port ${PORT}`); 
}
);

