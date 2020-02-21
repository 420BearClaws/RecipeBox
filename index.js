const express = require('express');
const path = require('path');

//declaring routers
const homeRouter = require('./routes/home');
const signloginRouter = require('./routes/loginsignup');
const myrecipesRouter = require('./routes/myrecipes');
const publicrecipesRouter = require('./routes/publicrecipes');
const enchiladacasseroleRouter = require('./routes/enchiladacasserole');

const app = express();
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

//creating a port
const debug = require('debug')('420BC:server');
const http = require('http');
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
//end create port

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//using routers
app.use('/', homeRouter);
app.use('/', myrecipesRouter);
app.use('/', publicrecipesRouter);
app.use('/', signloginRouter);
app.use('/', enchiladacasseroleRouter);


module.exports = app;