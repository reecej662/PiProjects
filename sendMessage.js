const request = require('request');

const FB_PAGE_ACCESS_TOKEN = 'EAAOV2mJd4dkBAHiPZCtiWsqvO5ZCaNmiKSUZAEKh3dXyK7LKq2ZCquKhe3FfFQxmwjqmIdOQdwXdwlFk9clwWvhkTMZBDyDRkzc3Cj5932pFhwNOhW38aH2fmHVc2aCZAfWsZBKKmXlcZCgLxZCzID37ZChMSKoZADgrpkoNSMZC2EutZBwZDZD'
const FB_VERIFY_TOKEN = 'asdf123'

var fbID = 1167421219983416
var message = ""

module.exports.sendMessage = function(message) {
  sendFBMessage(fbID, {text: message}, function() {
    console.log('Message sent!');
  });
}

function sendFBMessage(sender, messageData, callback) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: FB_PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }
    }, (error, response, body) => {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }

        if (callback) {
            callback();
        }
    });
}
