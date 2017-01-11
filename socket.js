var http = require('http')
var express = require('express'),
  app = module.exports.app = express();

var Gpio = require('onoff').Gpio;
var pir = new Gpio(14, 'in', 'both');

var server = http.createServer(app);
var io = require('socket.io').listen(server);
var apiai = require('./ai.js');

var ack = false;
var conn = false;
var auth = false;
var key = "1234asdf"

server.listen(5000, function() {
  console.log('Server running on port 5000');
});

app.get('/', function(req, res){
  res.send('Server running on port 5000');
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html', 
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket, data) {
  console.log('New connection');
  conn = true;
  console.log(data);

  socket.on('auth', function(data) {
    if(data == key) {
      auth = true;
      console.log("Connection authenticated");
    } else {
      console.log("Error validating session");
      socket.disconnect();
    }
  }); 

  socket.on('reset', function (data) {
    ack = false;
  });

  socket.on('airequest', function(data) {
    apiai.makeRequest(data, function(response){
      console.log('Response');
      socket.emit('airesponse', response);
    });
  });

});


pir.watch(function(err, value) {
  if (err) exit();
  
  if(value == 1) {

    if(!ack && conn) {
      console.log('Notifying');
      io.emit('movement');
      ack = true;

      setTimeout(function () {
        console.log("Reseting sensor");
        io.emit('reset');
        ack = false;
      }, 2000);
    }
  }
});

function exit() {
  pir.unexport();
  process.exit();
}