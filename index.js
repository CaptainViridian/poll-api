const dotenv = require('dotenv');

dotenv.config();

const { startServer } = require('./src/server.js');

startServer();
