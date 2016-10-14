'use strict'

const config = require('../config/config');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FB = require('fb');
const requestPromise = require('request-promise');
// const FacebookService = require('../services/facebook');
const facebook_handler = require('../services/botkit').handler;

module.exports = function (app) {
  app.use('/', router);
};

/**
 * Routes
 */
router.use('/auth', require('../auth'));

router.get('/facebook/pages/chose', (req, res) => {
  res.send("Okay great");
})

router.post('/facebook/message/receive', (req, res) => {
  // Assume all went well.
  //
  // You must send back a 200, within 20 seconds, to let us know you've
  // successfully received the callback. Otherwise, the request will time out.
  res.sendStatus(200);

  facebook_handler(req.body);

  var data = req.body;

  // // Make sure this is a page subscription
  // if (data.object == 'page') {
  //   // Iterate over each entry
  //   // There may be multiple if batched
  //   data.entry.forEach(function(pageEntry) {
  //     var pageId = pageEntry.id;
  //     var timeOfEvent = pageEntry.time;
  //     // Iterate over each messaging event
  //     pageEntry.messaging.forEach(function(messagingEvent) {
  //       // Add pageId to message event to know where to reply
  //       messagingEvent.pageId = pageId;
  //       if (messagingEvent.optin) {
  //         FacebookService.receivedAuthentication(messagingEvent);
  //       } else if (messagingEvent.message && !messagingEvent.message.app_id) {
  //         FacebookService.receivedMessage(messagingEvent);
  //       } else if (messagingEvent.delivery) {
  //         FacebookService.receivedDeliveryConfirmation(messagingEvent);
  //       } else if (messagingEvent.postback) {
  //         FacebookService.receivedPostback(messagingEvent);
  //       } else if (messagingEvent.read) {
  //         FacebookService.receiveReadMessage(messagingEvent);
  //       } else {
  //         console.log("Webhook received unknown messagingEvent: ");
  //       }
  //     });
  //   });
  // }
})

router.get('/facebook/message/receive', (req, res) => {
  if (req.query['hub.mode'] == 'subscribe') {
    if (req.query['hub.verify_token'] == process.env.WEBHOOK_VERIFY_TOKEN) {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('OK');
    }
  }
})






// Do it one time. This is for my app (marketer). It hads a subscription for the app
// so that I can receive all the webhook to a certain URL
FB.setAccessToken(process.env.FACEBOOK_APP_ACCESS_TOKEN);
const callbackUrl = `${config.host}/facebook/message/receive`;
const object = 'page';
const verify_token = process.env.WEBHOOK_VERIFY_TOKEN;
const field = [];
const apiUrl = `/${process.env.FACEBOOK_APP_ID}/subscriptions?callback_url=${callbackUrl}&object=${object}&verify_token=${verify_token}`;
FB.api(`${apiUrl}`, 'post', (res) => {
  if(!res.error) {
    console.log("Webhook url is set:", res);
  } else {
    console.log("ERROR:", res.error);
  }
});



/**************************************************************************************************************
 *  USELESS
 **************************************************************************************************************/


// const TwillioService = require('../services/twilio');
// const SlackService = require('../services/slack');
// const MessengerService = require('../services/messenger');
// const Botkit = require('botkit');
// const controller = Botkit.facebookbot({
//   access_token: process.env.PAGE_ACCESS_TOKEN,
//   verify_token: process.env.WEBHOOK_VERIFY_TOKEN,
// })

// const bot = controller.spawn({});

// // if you are already using Express, you can use your own server instance...
// // see "Use BotKit with an Express web server"
// // controller.setupWebserver(config.port, function(err, webserver) {
// //   controller.createWebhookEndpoints(controller.webserver, bot, function() {
// //     console.log('FACEBOOK Express webserver bot is online!');
// //   });
// // });

// // this is triggered when a user clicks the send-to-messenger plugin
// controller.on('facebook_optin', function(bot, message) {
//   bot.reply(message, 'Welcome to my app!');
// });

// // user said hello
// controller.hears(['hello'], 'message_received', function(bot, message) {
//   bot.reply(message, 'Hey there.');
// });

// controller.hears(['cookies'], 'message_received', function(bot, message) {
//   bot.startConversation(message, function(err, convo) {
//     convo.say('Did someone say cookies!?!!');
//     convo.ask('What is your favorite type of cookie?', function(response, convo) {
//       convo.say('Golly, I love ' + response.text + ' too!!!');
//       convo.next();
//     });
//   });
// });
