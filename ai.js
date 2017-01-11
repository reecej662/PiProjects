var apiai = require('apiai');

var app = apiai("717b5ccf439e464399b765b7d92ee6ca");

module.exports.makeRequest = function(request, callback) {
  var request = app.textRequest(request, {sessionId: 0000});

  request.on('response', function(response) {
    console.log('Response received');

    var speechResponse = response["result"]["fulfillment"]["speech"];
 
    callback(speechResponse);
  });

  request.on('error', function(error) {
    console.log(error);
  });

  request.end();
}
