'use strict';

var R = require("request");
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// =================================================================================
// The below code is used to set up a server and a webhook at /webhook.
// Danger Zone: Editing might break your app.
// =================================================================================

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;

// Listen for post requests
webhook.listen(3000, function() {
    console.log('Local development server listening on port 3000.');
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});


// =================================================================================
// Below is where the logic of your voice app should be happening
// Get started by adding some intents and Jovo functions
// =================================================================================

let handlers = {

    'LAUNCH': function() {
        app.toIntent('HelloWorldIntent');
    },

    'getTemperature': function() {
        
        R({
            url: 'https://thinger.ronangaillard.fr/v2/users/ronan/devices/roommonitor/temperature',
            method: 'GET',
            json: true,
            headers: {
                "Authorization": "Bearer " + process.env.THINGER_BEARER
            }

        }, function (err, resp, body) {
            if (!err) {
                app.tell('It\'s currently ' + body.out + ' degrees');
            }
            else {
                app.tell("Weird error");
            }
            //console.dir(body.out); //the bearer token...

        });
    },
};
