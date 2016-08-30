'use strict'

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TwillioService = require('../services/twilio'),
  SlackService = require('../services/slack');

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

// Auth routes
router.use('/auth', require('../auth'));

// Link botkit-sms-twilio to our express router (Mmmm Useless?)
TwillioService.connectTwilio(router);

// Link botkit-slackbot to our express router (Mmmm Useless?)
SlackService.connectSlack(router);
