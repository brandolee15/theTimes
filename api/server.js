const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const postsRoutes = require('./controllers/posts');
server.use('/posts', postsRoutes);

server.get('/', (req, res) => res.send('Welcome to the times'))

module.exports = server