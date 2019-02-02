require('babel-register');
require('dotenv').config();
const app = require('../app');
const http = require('http');

// Start server
const port = parseInt(process.env.PORT, 10) || 2337;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

require('./truncate')

require('./controllers');
