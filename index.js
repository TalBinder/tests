/**
 * Created by Tal on 10 May,2016.
 */
'use strict';

var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use('/facebook', function(req, res) {
   res.sendFile('./public/facebookShare.html', {root: __dirname});
});

var server = http.createServer(app);

//Starts server
server.listen(80);
server.on('error', onError);
server.on('listening', onListening);

//Event listener for server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = 'Port ' + 3002;

    // handle specific listen errors with friendly messages
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

//Event listener for server "listening" event.
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}