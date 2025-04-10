const express = require('express');
const { chats } = require('./data/data.js');

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
}
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);

