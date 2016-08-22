'use strict';

var SlackBot = require('slackbots');
var TwillioService = require('./twilio');
var User = require('../models/user');
var FacebookService = new require('./facebook');
var FacebookService = require('./facebook');
var FacebookVar = new FacebookService();
var config = require('../../config/config');

// // create a bot
// var bot = new SlackBot({
//     token: process.env.SLACK_MARKETER_BOT_API_KEY,
//     name: 'marketerbot'
// });

// var params = {
//   icon_emoji: ':ghost:'
// };

// let channels = [];
// bot.getChannels().then((data) => {
//   channels = data.channels;
// });

// // Detect new message on slack that the bot is in the channel
// // bot.on('message', function(data) {
// //   console.log("test:", data);
// //   if(data.type === 'message' && data.subtype !== 'bot_message' && !data.text.includes('<@')) {
// //     if(!data.text.includes('marketerbot')) {
// //       console.log("The message detected by the bot:", data.text)
// //       getChannelById(data.channel, (channel) => {
// //         console.log("Found the channel, now sending the message")
// //         TwillioService.sendSimpleMessage(channel.purpose.value, data.text);
// //       });
// //     }
// //   }
// // })

// // Just return the good channel based on Id
// function getChannelById(channelId, callback) {
//   channels.forEach((channel) => {
//     if(channel.id === channelId) {
//       return callback(channel);
//     }
//   });
// };

// // Just return the good channel based on the number
// exports.getChannelWithNumber = (number, callback) => {
//   channels.forEach((channel) => {
//     if(channel.purpose.value == number) {
//       return callback(channel);
//     }
//   });
// };

// // Send simple message to slack channel
// exports.sendMessageToChannel = (channelId, message) => {
//   bot.postMessage(channelId, message, params).catch((err) => {
//       console.log("ERROR:", err);
//   })
// }

// exports.executeThisCommand = (command) => {
//   // let responseText = "";

//   // switch(command) {
//   //   case 'fpost' :

//   //     break;
//   //   default:
//   //     responseText = "Sorry, I didn't understand"
//   //     break;
//   // }
// }




// var path = require('path');
// var fs = require('fs');
// var Bot = require('slackbots');

// // var NorrisBot = function Constructor(settings) {
// //     this.settings = settings;
// //     this.settings.name = this.settings.name || 'marketerbot';
// //     this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

// //     this.user = null;
// //     this.db = null;
// // };

// // inherits methods and properties from the Bot constructor
// // util.inherits(NorrisBot, Bot);

// class NorrisBot extends Bot {

//   constructor(settings) {
//     super(settings);
//     this.settings = settings;
//     this.settings.name = this.settings.name || 'marketerbot';
//     this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

//     this.user = null;
//     this.db = null;
//   }

//   run() {
//     console.log("Run the bot");

//     this.on('start', this._onStart);
//     this.on('message', this._onMessage);
//   }

//   _onStart() {
//     console.log("Bot started!");
//     this._loadBotUser();

//   };

//   *
//    * Loads the user object representing the bot
//    * @private

//   _loadBotUser() {
//       var self = this;
//       this.user = this.users.filter(function (user) {
//           return user.name === self.name;
//       })[0];
//   };

//   /**
//    * @param  {String}
//    * @return {[type]}
//    */
//   _onMessage(message) {
//     // console.log("On message", message);
//     // this._welcomeMessage()
//     // console.log("test:", this.channels)
//     if (this._isChatMessage(message) &&
//         this._isChannelConversation(message) &&
//         this._isFromNorrisBot(message) &&
//         this._isMentioningChuckNorris(message)
//     ) {
//       // console.log("Please bot, reply!")
//       this._replyWithRandomJoke(message);
//     }
//   }

//   _isChannelConversation() {
//     return typeof message.channel === 'string' && message.channel[0] === 'C';
//   }

//   /**
//    * Sends a welcome message in the channel
//    * @private
//    */
//   _welcomeMessage() {
//       this.postMessageToChannel(this.channels[0].name, 'Hi guys, roundhouse-kick anyone?' +
//           '\n I can tell jokes, but very honest ones. Just say `Chuck Norris` or `' + this.name + '` to invoke me!',
//           {as_user: true});
//   };

//   /**
//    * Util function to check if a given real time message object represents a chat message
//    * @param {object} message
//    * @returns {boolean}
//    * @private
//    */
//   _isChatMessage(message) {
//     return message.type === 'message' && Boolean(message.text);
//   };

//   /**
//    * Util function to check if a given real time message object is directed to a channel
//    * @param {object} message
//    * @returns {boolean}
//    * @private
//    */
//   _isChannelConversation(message) {
//     return typeof message.channel === 'string' && message.channel[0] === 'C';
//   };

//   /**
//    * Util function to check if a given real time message is mentioning Chuck Norris or the norrisbot
//    * @param {object} message
//    * @returns {boolean}
//    * @private
//    */
//   _isMentioningChuckNorris(message) {
//     return message.text.toLowerCase().indexOf('chuck norris') > -1 || message.text.toLowerCase().indexOf(this.name) > -1;
//   };

//   /**
//    * Util function to check if a given real time message has ben sent by the norrisbot
//    * @param {object} message
//    * @returns {boolean}
//    * @private
//    */
//   _isFromNorrisBot(message) {
//     return message.user === this.user.id;
//   };

//   /**
//    * Util function to get the name of a channel given its id
//    * @param {string} channelId
//    * @returns {Object}
//    * @private
//    */
//   _getChannelById(channelId) {
//     return this.channels.filter(function (item) {
//       return item.id === channelId;
//     })[0];
//   };
// }

// var settings = {
//   token : process.env.SLACK_MARKETER_BOT_API_KEY,
//   name : 'marketerbot',
//   dbPath : process.env.MONGO_LAB_DEV_URI
// };

// var myNorrisBot = new NorrisBot(settings);

// myNorrisBot.run();

// module.exports = NorrisBot;














let Botkit = require('botkit');
let Witbot = require('witbot');
let emoji = require("js-emoji");

let witbot = Witbot(process.env.WIT_TOKEN);
console.log("test:", process.env.SLACK_APP_CLIENT_ID);
console.log("test:", process.env.SLACK_APP_CLIENT_SECRET);
console.log("test:", process.env.SLACK_MARKETER_BOT_API_KEY);
console.log("test:", config.port);
if (!process.env.SLACK_APP_CLIENT_ID || !process.env.SLACK_APP_CLIENT_SECRET || !(process.env.SLACK_PORT || config.port) || !process.env.SLACK_MARKETER_BOT_API_KEY) {
    console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
    process.exit(1);
}

let slackAppConfig = {}
if (config.db) {
    var BotkitStorage = require('botkit-storage-mongo');
    slackAppConfig = {
        storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
    };
} else {
    slackAppConfig = {
        json_file_store: './db_slackbutton_slash_command/',
    };
}

var controller = Botkit.slackbot(slackAppConfig).configureSlackApp(
    {
        clientId: process.env.SLACK_APP_CLIENT_ID,
        clientSecret: process.env.SLACK_APP_CLIENT_SECRET,
        scopes: ['commands', 'bot'],
    }
);

controller.setupWebserver(process.env.SLACK_PORT, function (err, webserver) {
    controller.createWebhookEndpoints(controller.webserver);

    controller.createOauthEndpoints(controller.webserver, function (err, req, res) {
        if (err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            res.send('Success!');
        }
    });
});

let bot = controller.spawn({
    token: process.env.SLACK_MARKETER_BOT_API_KEY
}).startRTM();

// Loading teams
bot.api.team.info({}, (err, res) => {
    controller.storage.teams.save({id: res.team.id}, (err) => {
        if (err) {
            console.error(err)
        }
    })
});

//
// BEGIN EDITING HERE!
//

controller.on('create_bot',function(bot, config) {
  if (_bots[bot.config.token]) {
    // already online! do nothing.
  } else {
    bot.startRTM(function(err) {
      if (!err) {trackBot(bot);}
      bot.startPrivateConversation({user: config.createdBy},function(err,convo) {
        if (err) {
          console.log(err);
        } else {
          convo.say('I am a bot that has just joined your team');
          convo.say('You must now /invite me to a channel so that I can be of use!');
        }
      });

    });
  }

});


// Handle events related to the websocket connection to Slack
controller.on('rtm_open',function(bot) {
  console.log('** The RTM api just connected!');
});

controller.on('rtm_close',function(bot) {
  console.log('** The RTM api just closed');
  // you may want to attempt to re-open
});

controller.on('slash_command', function (slashCommand, message) {
  // console.log("slashCommand:", slashCommand);
  console.log("message:", message);
    switch (message.command) {
        case "/echo": //handle the `/echo` slash command. We might have others assigned to this app too!
            // The rules are simple: If there is no text following the command, treat it as though they had requested "help"
            // Otherwise just echo back to them what they sent us.

            // but first, let's make sure the token matches!
            // if (message.token !== process.env.SLACK_TOKEN) return; //just ignore it.

            // if no text was supplied, treat it as a help command


            // If we made it here, just echo what the user typed back at them
            //TODO You do it!
            slashCommand.replyPublic(message, "1", function() {
                slashCommand.replyPublicDelayed(message, "2").then(slashCommand.replyPublicDelayed(message, "3"));
            });

            break;
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

    }

});

// receive an interactive message, and reply with a message that will replace the original
controller.on('interactive_message_callback', function(bot, message) {

    // check message.actions and message.callback_id to see what action to take...

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

});

// controller.on('direct_message', function(bot, message) {
//   let wit = witbot.process(message.text, bot, message)
//   bot.reply(message, 'What can I do for you?');

//   wit.hears('hello', 0.5, (bot, message, outcome) => {
//     bot.reply(message, 'Hello to you as well!');
//   });
// });

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


controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});

controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});


controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});


/*
  When bot hears facebookpost, we want to ask the user some question before creating the post
 */
controller.hears(['facebookpost'], 'message_received,direct_message', function(bot, message) {
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
});



// module.exports = controller;


