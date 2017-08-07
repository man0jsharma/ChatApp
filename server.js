var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var route = require('./route')
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var config = require('./config');
var port = 5000;

//Mongo db connection
mongoose.Promise = global.Promise
mongoose.connect(config.database);

app.use(cors());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "chatapp")));
app.use('/api', route);

io.on('connection', function (socket) {
    console.log(`The Connection was made`);

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('message-from-client', function (msg) {
        console.log(msg);
        io.emit('message-from-server', msg);
    })
});

server.listen(port, function () {
    console.log('Listening the port 5000');
})