'use strict'

const Wit = require('node-wit').Wit;
const interactive = require('node-wit').interactive;
const accessToken = process.env.WIT_TOKEN;

class WitService extends Wit {

  constructor(accessToken, actions) {
    super({accessToken, actions});
  }

  startInteractive() {
    interactive(this);
  }

  sendMessage(message, context) {
    this.message(message, context)
    .then((data) => {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
    })
    .catch(console.error)
  }
};

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('user said...', request.text);
      console.log('sending...', JSON.stringify(response));
      return resolve();
    });
  },
};


const client = new WitService(accessToken, actions);

/**
 * Testing
 */
// client.sendMessage('Hello');

module.exports = client;
