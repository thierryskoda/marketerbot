'use strict';
var isTesting = false;

var twilio = require("twilio");
var accountSid = (isTesting) ? process.env.TWILIO_TEST_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID;
var authToken = (isTesting) ? process.env.TWILIO_TEST_AUTH_TOKEN : process.env.TWILIO_AUTH_TOKEN;
var client = new twilio.RestClient(accountSid, authToken);
var slackService = require('./slack');

let myTwilioNumber = '+15146125723';

let usersList = [{
  name : 'Louis-Charles',
  number : '+14506026169'
},{
  name : 'Thierry',
  number : '+14384969893'
},{
  name : 'Caro',
  number : '+15147025603'
},{
  name : 'Antoine',
  number : '+15142081009'
},{
  name : 'Antoine',
  number : '+15142081009'
},{
  name : 'Abel',
  number : '+15148955133'
}]


exports.sendSimpleMessage = (number, text) => {
  console.log("Sending message to :", number)
  client.messages.create({
      body: text,
      to: '+' + number,  // Text this number
      from: myTwilioNumber // From a valid Twilio number
  }, function(err, message) {
    if(err) {
      console.log("ERROR:", err)
    } else {
      console.log("We just sent : '" + text + " ' to " + number);
    }
  });
}

exports.receivedAMessage = (messageBody) => {
  console.log("The message receveid: ", messageBody.Body);
  usersList.forEach((user) => {
    if(user.number == messageBody.From) {
      slackService.getChannelWithNumber(messageBody.From, (channel) => {
        console.log("The channel based on the number:", channel.name)
        slackService.sendMessageToChannel(channel.id, messageBody.Body);
      });
    }
  })
};
