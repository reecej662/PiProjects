var Gpio = require('onoff').Gpio;
var pir = new Gpio(14, 'in', 'both');

var fbMessage = require('./sendMessage.js');
var messageSent = false;

pir.watch(function(err, value) {
  if (err) exit();
  
  if(value == 1) {
    console.log('Sending Message');

    if(!messageSent) {
      fbMessage.sendMessage("Person detected");
      messageSent = true;
    }
  }
});

console.log('Pi Bot deployed successfully!');

function exit() {
  pir.unexport();
  process.exit();
}
