'use strict';

let app = require('../../app');
let TwillioService = require('./twilio');
let User = require('../models/user');
let Wit = require('./wit');
let FacebookService = require('./facebook');
let FacebookVar = new FacebookService();
let config = require('../../config/config');
let Botkit = require('botkit').slackbot;
let emoji = require("js-emoji");
var apiai = require('apiai');
var apiaiApp = apiai(process.env.APIAI_TOKEN);

/*
  Testing shitsss
 */
// var request = apiaiApp.textRequest('hello');
// request.on('response', function(response) {
//     console.log(response);
// });
// request.on('error', function(error) {
//     console.log(error);
// });
// request.end()

/*
  Link webhook endpoint to our express server endpoints (USELESS)
*/
exports.connectSlack = (router) => {
  controller.createWebhookEndpoints(router, bot, function () {
    console.log('SLACK bot is online!')
  })
}

/*
  Stop if missing info
 */
if (!process.env.SLACK_APP_CLIENT_ID || !process.env.SLACK_APP_CLIENT_SECRET || !(process.env.SLACK_PORT || config.port) || !process.env.SLACK_MARKETER_BOT_API_KEY) {
    console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
    process.exit(1);
}

/*
  Configs
 */
let slackAppConfig = {}
if (config.db) {
  let BotkitStorage = require('botkit-storage-mongo');
  slackAppConfig = {
    storage: BotkitStorage({mongoUri: config.db}),
  };
}

/*
  Process
 */
let controller;
let bot;
createSlackBotController()
// startWebServer(); // We use an express server
startBotRTM();
loadTeams();
controller.on('rtm_open', rtmIsOpen);
controller.on('rtm_close', rtmIsClose);
controller.on('slack_command', onSlashCommands);
controller.on('slack_command', onSlashCommands);
controller.on('interactive_message_callback', handleInteractiveMessageCallback);
controller.on('direct_message', handleDirectMessage);
controller.hears(['facebookpost'], 'message_received,direct_message', hearsFacebookPost);

/*
  Functions starts here
 */
function createSlackBotController() {
  controller = Botkit(slackAppConfig).configureSlackApp({
    clientId: process.env.SLACK_APP_CLIENT_ID,
    clientSecret: process.env.SLACK_APP_CLIENT_SECRET,
    scopes: ['commands', 'bot'],
  });
}

function startWebServer() {
  controller.setupWebserver(config.port, function (err, webserver) {
    controller.createWebhookEndpoints(app);
    controller.createOauthEndpoints(controller.webserver, function (err, req, res) {
      if (err) {
          res.status(500).send('ERROR: ' + err);
      } else {
          res.send('Success!');
      }
    });
  });
}

function startBotRTM() {
  bot = controller.spawn({
    token: process.env.SLACK_MARKETER_BOT_API_KEY
  }).startRTM();
}

function loadTeams() {
  bot.api.team.info({}, (err, res) => {
    controller.storage.teams.save({id: res.team.id}, (err) => {
      if (err) {
        console.error(err)
      }
    })
  });
}

function rtmIsClose() {
  console.log('** The RTM api just closed');
}

function rtmIsOpen() {
  console.log('** The RTM api just connected!');
}

/*
  Handle SlashComands
 */
function onSlashCommands(slashCommand, message) {
  // console.log("slashCommand:", slashCommand);
  // console.log("message:", message);
  switch (message.command) {
    case "/facebookpost" :
      if (message.text === "" || message.text === "help") {
        slashCommand.replyPrivate(message, "Don't forget to include the *message* of your post and an *optional* link");
        return;
      }

      console.log("test:", message.text.split().length);
      if(message.text.split(' ').length == 2) {
        let postMessage = message.text.split(' ')[0];
        let postLink = message.text.split(' ')[1];
        FacebookVar.postOnFacebook({message: postMessage, link: postLink});
      } else {
        slashCommand.replyPublic(message, "Missing info! Try `/facebookpost [MESSAGE] [LINK](optional)`");
      }
      break;
    default:
      slashCommand.replyPublic(message, "I'm afraid I don't know how to " + message.command + " yet.");
      break;
  }
}

/*
  Handle Interactive Callback
 */
function handleInteractiveMessageCallback(bot, message) {
  bot.replyInteractive(message, {
    text: '...',
    attachments: [
      {
        title: 'My buttons',
        callback_id: '123',
        attachment_type: 'default',
        actions: [
          {
            "name":"yes",
            "text": "Yes!",
            "value": "yes",
            "type": "button",
          },
          {
            "text": "No!",
            "name": "no",
            "value": "delete",
            "style": "danger",
            "type": "button",
            "confirm": {
              "title": "Are you sure?",
              "text": "This will do something!",
              "ok_text": "Yes",
              "dismiss_text": "No"
            }
          }
        ]
      }
    ]
  });
}

/*
  Handle direct message
 */
function handleDirectMessage(bot, message) {
  // let wit = witbot.process(message.text, bot, message)
  // bot.reply(message, 'What can I do for you?');
  bot.replyWithTyping(message, "Yes, what can I do for you?");
//
  // wit.hears('hello', 0.5, (bot, message, outcome) => {
  //   bot.reply(message, 'Hello to you as well!');
  // });
}


/*
  When bot hears facebookpost, we want to ask the user some question before creating the post
 */
function hearsFacebookPost(bot, message) {
  let postMessage = "";
  let postLink = "";
  let postPage = "";

  let askForMessage = function(response, convo) {
    convo.ask('What is your post message? (Psstt! cancel at any time by saying *cancel*)', function(response, convo) {
      postMessage = response.text;
      convo.say('Awesome.');
      askForLink(response, convo);
      convo.next();
    });
  }
  let askForLink = function(response, convo) {
    convo.ask('What is the link of your post? (Ex: www.google.ca)', function(response, convo) {
      if(response.text == "cancel") convo.stop();
      postLink = response.text.replace('<','').replace('>','').split('|')[0];
      convo.say('Ok. Thanks')
      askForPages(response, convo);
      convo.next();
    });
  }
  let askForPages = function(response, convo) {
    convo.ask('On what page do you want to post?', function(response, convo) {
      if(response.text == "cancel") convo.stop();
      postPage = response.text;
      convo.say('Great! We will post *' + postMessage + '* with this link *' + postLink + '* on this Facebook page: *' + postPage + '*' );
      askForConfirm(response, convo);
      convo.next();
    });
  }
  let askForConfirm = function(response, convo) {
    convo.ask('Say *confirm* to confirm, *restart* to restart the process, *cancel* to quit.', function(response, convo) {
      if(response.text === 'cancel') convo.stop();
      if(response.text === 'confirm') {
        // var values = convo.extractResponses();
        FacebookVar.postOnFacebook({message: postMessage, link: postLink}, postPage, function(err) {
          if(err) {
            convo.say(err.message);
          } else {
            convo.say('Done! Bye bye!');
            convo.next();
          }
        });
      } else if(response.text === 'restart') {
        convo.stop();
        bot.startConversation(message, askForMessage);
      } else {
        convo.say("Hmm, I couldn't understand.");
        convo.repeat();
      }
    });
  }

  bot.startConversation(message, askForMessage);
}

// controller.on(['direct_message','mention','direct_mention'], function(bot, message) {
//   var reply_with_attachments = {
//       'username': 'My bot' ,
//       'text': 'This is a pre-text',
//       'attachments': [
//         {
//           'fallback': 'To be useful, I need you to invite me in a channel.',
//           'title': 'How can I help you?',
//           'text': 'To be useful, I need you to invite me in a channel ',
//           'color': '#7CD197',
//           "actions": [
//                 {
//                     "name": "chess",
//                     "text": "Chess",
//                     "type": "button",
//                     "value": "chess"
//                 },
//                 {
//                     "name": "maze",
//                     "text": "Falken's Maze",
//                     "type": "button",
//                     "value": "maze"
//                 },
//                 {
//                     "name": "war",
//                     "text": "Thermonuclear War",
//                     "style": "danger",
//                     "type": "button",
//                     "value": "war",
//                     "confirm": {
//                         "title": "Are you sure?",
//                         "text": "Wouldn't you prefer a good game of chess?",
//                         "ok_text": "Yes",
//                         "dismiss_text": "No"
//                     }
//                 }
//             ]
//         }
//       ],
//       'link_names' : 'LINK NAME',
//       'icon_url': 'http://lorempixel.com/48/48'
//       }

//     bot.reply(message, reply_with_attachments);
//   // bot.api.reactions.add({
//   //   timestamp: message.ts,
//   //   channel: message.channel,
//   //   name: 'heart_eyes',
//   // });
// });
