'use strict'

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
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
})


var Slack = require('slack-node');
var slack = new Slack(process.env.SLACK_MARKETER_BOT_API_KEY);

// slack.api("channels.list", function(err, response) {
//   console.log(response);
// });

// slack.api('chat.postMessage', {
//   text:"What's" ,
//   channel:'#general'
// }, function(err, response){
//   console.log(response);
// });

var webhookUri = "https://hooks.slack.com/services/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";

var slack = new Slack();
slack.setWebhook(webhookUri);

// slack emoji
// slack.webhook({
//   channel: "#test",
//   username: "markbot",
//   icon_emoji: ":ghost:",
//   text: "test message to see if test channel works"
// }, function(err, response) {
//   console.log(response);
// });


var SlackBot = require('slackbots');




// var requestPromise = require('request-promise');

// var requestOption = {
//   method : 'POST',
//   url: 'https://slack.com/api/channels.invite',
//   formData:  {
//     token: process.env.SLACK_THIERRY_TEST_TOKEN_DISCOSHARE,
//     channel : 'C20TD9ZFE',
//     user : 'U20T50C93'
//   }
// };

// requestPromise(requestOption).then((data) => {
//     console.log("test:", data)
// }).catch((err) => {
//   console.log("ERROR:", err);
// })
