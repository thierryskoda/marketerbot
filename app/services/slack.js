'use strict';

var SlackBot = require('slackbots');
var TwillioService = require('./twilio');

// create a bot
var bot = new SlackBot({
    token: process.env.SLACK_MARKETER_BOT_API_KEY,
    name: 'marketerbot'
});

var params = {
  icon_emoji: ':ghost:'
};

let channels = [];
bot.getChannels().then((data) => {
  channels = data.channels;
});

// Detect new message on slack that the bot is in the channel
bot.on('message', function(data) {
  console.log("test:", data);
  if(data.type === 'message' && data.subtype !== 'bot_message' && !data.text.includes('<@')) {
    if(!data.text.includes('marketerbot')) {
      console.log("The message detected by the bot:", data.text)
      getChannelById(data.channel, (channel) => {
        console.log("Found the channel, now sending the message")
        TwillioService.sendSimpleMessage(channel.purpose.value, data.text);
      });
    }
  }
})

// Just return the good channel based on Id
function getChannelById(channelId, callback) {
  channels.forEach((channel) => {
    if(channel.id === channelId) {
      return callback(channel);
    }
  });
};

// Just return the good channel based on the number
exports.getChannelWithNumber = (number, callback) => {
  channels.forEach((channel) => {
    if('+' + channel.purpose.value == number) {
      return callback(channel);
    }
  });
};

// Send simple message to slack channel
exports.sendMessageToChannel = (channelId, message) => {
  bot.postMessage(channelId, message, params).catch((err) => {
      console.log("ERROR:", err);
  })
}


// Handle Facebook post

/* Mask: */
background-image: linear-gradient(-180deg, rgba(237,237,237,0.00) 0%, #D8D8D8 100%);
/* survey_results_background: */
/* iPhone Hands 1: */
/* Rectangle 50: */
background: #FFFFFF;
/* Multilingual typing: */
/* iPhone 6: */
/* iPhone Hands 1: */
