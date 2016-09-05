'use strict'

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let TwillioService = require('../services/twilio');
let SlackService = require('../services/slack');
let MessengerService = require('../services/messenger');

module.exports = function (app) {
  app.use('/', router);
};

// router.get('/', function (req, res, next) {
//   res.render('index', {
//     title: 'Generator-Express MVC'
//   });
// });

// router.post('/receivemessage', (req, res, next) => {
//   TwillioService.receivedAMessage(req.body);
//   return res.status(200).end();
// });

// router.post('/sms/receive', TwillioService.receiveSimpleMessage);



router.get('/facebook/receive', (req, res) => {
  return res.status(200).send(req.query['hub.challenge']);
})

// Auth routes
router.use('/auth', require('../auth'));

// Link botkit-sms-twilio to our express router (Mmmm Useless?)
// TwillioService.connectTwilio(router);

// Link botkit-slackbot to our express router (Mmmm Useless?)
// SlackService.connectSlack(router);

// let facebook_handler = require('../services/messenger').handler

router.post('/facebook/receive', (req, res) => {
  console.log("Revece")
  facebook_handler(req.body);
  res.send('ok');
});




// let Botkit = require('botkit');
// let config = require('../../config/config');
// let controller = Botkit.facebookbot({
//   access_token: process.env.PAGE_ACCESS_TOKEN,
//   verify_token: process.env.WEBHOOK_VERIFY_TOKEN,
// })

// let bot = controller.spawn({});

// // if you are already using Express, you can use your own server instance...
// // see "Use BotKit with an Express web server"
// controller.setupWebserver(config.port, function(err,webserver) {
//   controller.createWebhookEndpoints(controller.webserver, bot, function() {
//       console.log('FACEBOOK Bot is online!');
//   });
// });

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
