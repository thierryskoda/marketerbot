// var Botkit = require('botkit')
// var mongoUri = process.env.MONGOLAB_URI;
// // var db = require('../../config/db')({mongoUri: mongoUri})
// var request = require('request')

// var controller = Botkit.facebookbot({
//   debug: true,
//   access_token: process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN_WHITEFRAME,
//   verify_token: process.env.WEBHOOK_VERIFY_TOKEN
//   // storage: db
// })

// var bot = controller.spawn({})

// // subscribe to page events
// request.post('https://graph.facebook.com/me/subscribed_apps?access_token=' + process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN_WHITEFRAME,
//   function (err, res, body) {
//     if (err) {
//       controller.log('Could not subscribe to page messages')
//     }
//     else {
//       controller.log('Successfully subscribed to Facebook events:', body)
//       console.log('Botkit activated')

//       // start ticking to send conversation messages
//       controller.startTicking()
//     }
//   }
// )

// // this is triggered when a user clicks the send-to-messenger plugin
// controller.on('facebook_optin', function (bot, message) {
//   bot.reply(message, 'Welcome, friend')
// })

// // user said hello
// controller.hears(['hello','hey','salut','hi','yo'], 'message_received', function (bot, message) {
//   bot.reply(message, 'Hey there.')
// })

// controller.hears(['convo'], 'message_received', (bot, message) => {
//   let postMessage = "";
//   let postLink = "";
//   let postPage = "";

//   let askForMessage = function(response, convo) {
//     convo.ask('What is your post message? (Psstt! cancel at any time by saying *cancel*)', function(response, convo) {
//       postMessage = response.text;
//       convo.say('Awesome.');
//       askForLink(response, convo);
//       convo.next();
//     });
//   }
//   let askForLink = function(response, convo) {
//     convo.ask('What is the link of your post? (Ex: www.google.ca)', function(response, convo) {
//       if(response.text == "cancel") convo.stop();
//       postLink = response.text.replace('<','').replace('>','').split('|')[0];
//       convo.say('Ok. Thanks')
//       askForPages(response, convo);
//       convo.next();
//     });
//   }
//   let askForPages = function(response, convo) {
//     convo.ask('On what page do you want to post?', function(response, convo) {
//       if(response.text == "cancel") convo.stop();
//       postPage = response.text;
//       convo.say('Great! We will post *' + postMessage + '* with this link *' + postLink + '* on this Facebook page: *' + postPage + '*' );
//       askForConfirm(response, convo);
//       convo.next();
//     });
//   }
//   let askForConfirm = function(response, convo) {
//     convo.ask('Say *confirm* to confirm, *restart* to restart the process, *cancel* to quit.', function(response, convo) {
//       if(response.text === 'cancel') convo.stop();
//       if(response.text === 'confirm') {
//         // var values = convo.extractResponses();
//         FacebookVar.postOnFacebook({message: postMessage, link: postLink}, postPage, function(err) {
//           if(err) {
//             convo.say(err.message);
//           } else {
//             convo.say('Done! Bye bye!');
//             convo.next();
//           }
//         });
//       } else if(response.text === 'restart') {
//         convo.stop();
//         bot.startConversation(message, askForMessage);
//       } else {
//         convo.say("Hmm, I couldn't understand.");
//         convo.repeat();
//       }
//     });
//   }

//   bot.startConversation(message, askForMessage);
// })

// // user says anything else
// controller.hears('(.*)', 'message_received', function (bot, message) {
//   bot.reply(message, 'you said ' + message.match[1])
// })

// // this function processes the POST request to the webhook
// var handler = function (obj) {
//   controller.debug('GOT A MESSAGE HOOK')
//   var message
//   if (obj.entry) {
//     for (var e = 0; e < obj.entry.length; e++) {
//       for (var m = 0; m < obj.entry[e].messaging.length; m++) {
//         var facebook_message = obj.entry[e].messaging[m]

//         // normal message
//         if (facebook_message.message) {
//           message = {
//             text: facebook_message.message.text,
//             user: facebook_message.sender.id,
//             channel: facebook_message.sender.id,
//             timestamp: facebook_message.timestamp,
//             seq: facebook_message.message.seq,
//             mid: facebook_message.message.mid,
//             attachments: facebook_message.message.attachments
//           }
//           // save if user comes from m.me adress or Facebook search
//           // create_user_if_new(facebook_message.sender.id, facebook_message.timestamp)
//           controller.receiveMessage(bot, message)
//         }
//         // clicks on a postback action in an attachment
//         else if (facebook_message.postback) {
//           // trigger BOTH a facebook_postback event
//           // and a normal message received event.
//           // this allows developers to receive postbacks as part of a conversation.
//           message = {
//             payload: facebook_message.postback.payload,
//             user: facebook_message.sender.id,
//             channel: facebook_message.sender.id,
//             timestamp: facebook_message.timestamp
//           }

//           controller.trigger('facebook_postback', [bot, message])

//           message = {
//             text: facebook_message.postback.payload,
//             user: facebook_message.sender.id,
//             channel: facebook_message.sender.id,
//             timestamp: facebook_message.timestamp
//           }

//           controller.receiveMessage(bot, message)
//         }
//         // When a user clicks on "Send to Messenger"
//         else if (facebook_message.optin) {
//           message = {
//             optin: facebook_message.optin,
//             user: facebook_message.sender.id,
//             channel: facebook_message.sender.id,
//             timestamp: facebook_message.timestamp
//           }

//             // save if user comes from "Send to Messenger"
//           create_user_if_new(facebook_message.sender.id, facebook_message.timestamp)

//           controller.trigger('facebook_optin', [bot, message])
//         }
//         // message delivered callback
//         else if (facebook_message.delivery) {
//           message = {
//             optin: facebook_message.delivery,
//             user: facebook_message.sender.id,
//             channel: facebook_message.sender.id,
//             timestamp: facebook_message.timestamp
//           }

//           controller.trigger('message_delivered', [bot, message])
//         }
//         else {
//           // controller.log('Got an unexpected message from Facebook: ', facebook_message)
//         }
//       }
//     }
//   }
// }

// var create_user_if_new = function (id, ts) {
//   console.log("new user?");
//   controller.storage.users.get(id, function (err, user) {
//     if (err) {
//       console.log(err)
//     }
//     else if (!user) {
//       controller.storage.users.save({id: id, created_at: ts})
//     }
//   })
// }

// exports.handler = handler
