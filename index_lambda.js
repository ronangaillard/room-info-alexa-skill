'use strict';

// =================================================================================
// The below code is used to set up the AWS Lambda handler
// =================================================================================

const app = require('jovo-framework').Jovo;

exports.handler = function(event, context, callback) {
    app.handleRequest(event, callback, handlers);
    app.execute();
};


// =================================================================================
// Below is where the logic of your voice app should be happening
// Get started by adding some intents and Jovo functions
// =================================================================================

let handlers = {

    'LAUNCH': function() {
        app.toIntent('HelloWorldIntent');
    },

    'HelloWorldIntent': function() {
        app.tell('Hello World!');
    },
};
