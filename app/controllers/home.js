'use strict'

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TwillioService = require('../services/twilio');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Generator-Express MVC'
  });
});

router.post('/receivemessage', (req, res, next) => {
  TwillioService.receivedAMessage(req.body);
  return res.status(200).end();
});

// Auth
router.use('/auth', require('../auth'));




// 'use strict'

// var Botkit = require('botkit');

// var controller = Botkit.slackbot({
//     debug: true
// });

// controller.setupWebserver(3000, function(err, webserver) {
//     controller.createWebhookEndpoints(webserver);
// });

// controller.on('slash_command', function(bot, message) {
//   console.log("SLAsH:")
//     // check message.command
//     // and maybe message.text...
//     // use EITHER replyPrivate or replyPublic...
//     bot.replyPrivate(message, 'This is a private reply to the ' + message.command + ' slash command!');

//     // and then continue to use replyPublicDelayed or replyPrivateDelayed
//     bot.replyPublicDelayed(message, 'This is a public reply to the ' + message.command + ' slash command!');

//     bot.replyPrivateDelayed(message, ':dash:');
// });

// module.exports = controller;

