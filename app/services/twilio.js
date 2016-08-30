'use strict';
let isTesting = false;

let app = require('../../app');
let twilio = require("twilio");
let accountSid = (isTesting) ? process.env.TWILIO_TEST_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID;
let authToken = (isTesting) ? process.env.TWILIO_TEST_AUTH_TOKEN : process.env.TWILIO_AUTH_TOKEN;
let myTwilioNumber = (isTesting) ? '+15005550006' : process.env.TWILIO_NUMBER;
let client = new twilio.RestClient(accountSid, authToken);
let slackService = require('./slack');
let config = require('../../config/config');
let FacebookService = require('./facebook');
let FacebookVar = new FacebookService();

let demoImage = "https://s3.amazonaws.com/marketer.ai/images/Group+2.png";

// let usersList = [{
//   name : 'Louis-Charles',
//   number : '+14506026169'
// },{
//   name : 'Thierry',
//   number : '+14384969893'
// },{
//   name : 'Caro',
//   number : '+15147025603'
// },{
//   name : 'Antoine',
//   number : '+15142081009'
// },{
//   name : 'yen',
//   number : '+15149474759'
// },{
//   name : 'Abel',
//   number : '+15148955133'
// }]
//


exports.sendMediaMessage = (to, text, image) => {
  client.messages.create({
      body: text,
      to: to,
      from: myTwilioNumber,
      mediaUrl: demoImage
  }, function(err, message) {
    if(err) {
      console.log("ERROR:", err)
    } else {
      console.log("Success sending message with image :", message);
    }
  });
}

exports.receivedAMessage = (messageBody) => {
  console.log("The message receveid: ", messageBody.Body);
  if(messageBody.From[0] === '+') messageBody.From = messageBody.From.substr(1);
  slackService.getChannelWithNumber(messageBody.From, (channel) => {
    console.log("The channel based on the number:", channel.name)
    slackService.sendMessageToChannel(channel.id, messageBody.Body);
  });
};


let slackAppConfig = {}
if (config.db) {
  let BotkitStorage = require('botkit-storage-mongo');
  slackAppConfig = {
    storage: BotkitStorage({mongoUri: config.db}),
  };
}

const TwilioSMSBot = require('botkit-sms')

let BotkitStorage = require('botkit-storage-mongo');
slackAppConfig = {
  storage: BotkitStorage({mongoUri: config.db}),
};

const controller = TwilioSMSBot({
  storage: BotkitStorage({mongoUri: config.db}),
  account_sid: accountSid,
  auth_token: authToken,
  twilio_number: myTwilioNumber
})

let bot = controller.spawn({});

controller.setupWebserver(config.port, function (err, webserver) {
  controller.createWebhookEndpoints(controller.webserver, bot, function () {
    console.log('TwilioSMSBot is online!');
    if(isTesting) console.log("TESTING MODE");
  })
})

/**
 * Conversion for posting a link on Facebook
 */
controller.hears(['facebookpost','fbpost'], 'message_received', (bot, message) => {
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
})

/**
 * Conversion for posting a link on Facebook
 */
controller.hears(['Hi', 'Hello', 'Hey', 'What up', 'Salut', 'Allo', 'Bonjour'], 'message_received', (bot, message) => {
  let userName = "";
  let userAge = "";
  let userBudget = "";

  // Do we already have the use?
  console.log("DO we have this user? : ", message.user)
  controller.storage.users.get(message.user, function(err, user) {
    console.log("The user we have found:", user)
    if(!user) {
      user = {
        id: message.user
      };
      controller.storage.users.save(user, function(err, id) {
        // We have a new user so we need some of his info!
        bot.startConversation(message, askForName);
      });
    } else {
      if(user.name) {
        bot.reply(message, `Hello ${user.name}`);
      } else {
        bot.startConversation(message, askForName);
      }
    }
  });

  let askForName = function(response, convo) {
    convo.say("Hey! I'm Mark! Your own personnal full-time marketing bot :D")
    convo.ask("What's your name?", function(response, convo) {
      userName = response.text;
      convo.say('Beautiful name :)');
      askForAge(response, convo);
      convo.next();
    });
  }
  let askForAge = function(response, convo) {
    convo.ask('Can I ask how old are you?', function(response, convo) {
      let isNumber = /^\d+$/.test(response.text)
      if(isNumber) {
        userAge = response.text;
        if(parseInt(response.text) < 30) {
          convo.say('WOW! Soooooo young!')
        }
        convo.say('Okay, good')
        askForBudget(response, convo);
        convo.next();
      } else {
        convo.say("Just give me the number please!")
        convo.repeat();
        convo.next();
      }
    });
  }
  let askForBudget = function(response, convo) {
    convo.ask('What will be your marketing budget this month? (Ex: 300$)', function(response, convo) {
      let containDollarSign = response.text.includes('$');
      if(containDollarSign) {
        userBudget = response.text.split('$')[0];
        convo.say("Great!");
        convo.say("I'm done with you");
        convo.say(`Bye bye ${userName}. ${userAge} years old with ${userBudget}$ in marketing budget ;)`);
        controller.storage.users.get(message.user, function(err, user) {
          console.log("The user that we have:", user);
          if(user) {
            user.name = userName;
            user.age = userAge;
            user.budget = userBudget;
            controller.storage.users.save(user);
          }
        });
        convo.next();
      } else {
        convo.say("Hmm.. I didn't understand.. :(")
        convo.repeat();
        convo.next();
      }
    });
  }
})

/**
 * Send the user an example of Facebook post (DEMO)
 * @param  {[type]} response [description]
 * @param  {[type]} convo)   {               convo.say("Here's what I founded for you!");    exports.sendMediaMessage(message.from, "Here's your the Facebook post. :)" [description]
 * @return {[type]}          [description]
 */
controller.hears(['give'], 'message_received, direct_message', (bot, message) => {
  console.log("Heard *Give*");
  setTimeout(function() {bot.reply(message,"hugg")}, 5000);
  // bot.startConversation(message, sendFacebookPost);

  // function sendFacebookPost(response, convo) {
  //   convo.say("Hey! Let me find something good for you");
  //   foundTheFacebookPost(response, convo);
  //   convo.next();
  // }

  // function foundTheFacebookPost(reponse, convo) {
  //   convo.say("Okay!");
  //   convo.say("I founded something and I will send you a picture of it so you can approve!");
  //   // exports.sendMediaMessage(message.from, "There you go! :)");
  //   convo.next();
  // }
});

/**
 * GLOBAL message receive
 * @param  {[type]} '.*'               [description]
 * @param  {[type]} 'message_received' [description]
 * @param  {[type]} (bot,              message)      [description]
 * @return {[type]}                    [description]
 */
controller.hears('.*', 'message_received', (bot, message) => {
  console.log("Receveid Default Message:", message.text);
  bot.reply(message, "huh? I'm not sure to understand ... :(");
})

exports.connectTwilio = (router) => {
  // controller.createWebhookEndpoints(router, bot, function () {
  //   console.log('TwilioSMSBot is online!')
  // })
}
