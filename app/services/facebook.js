'use strict'

const config = require('../config/config');
const requestPromise = require('request-promise');
const FB = require('fb');
const User = require('../models/user');

module.exports = {
  receivedMessage,
  receivedAuthentication,
  receivedDeliveryConfirmation,
  receivedPostback,
  receiveReadMessage,
  sendButtonMessage,
  sendTextMessage,
  sendGenericMessage,
  makeUserChooseHisPage,
  callSendAPI
}


/**************************************************************************************************************
 *  Received a message from webhook!
 **************************************************************************************************************/
function receivedMessage(event) {
  console.log("event:", event)
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;
  var pageId = event.pageId;

  console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);

  // Get the profile of the user
  FB.setAccessToken(process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN);
  FB.api(`${senderID}`, (res) => {
    console.log("the profile of the user:", res)
    // Do we already have him?
    User.findOne({name: new RegExp('^' + res.first_name + '$', "i")}, (err, user) => {
      if(err) {
        console.log("ERROR:", err);
        return;
      }

      if(!user) {
        console.log("No user");
        User.create({
          messenger: {
            id: senderID
          }
        });
      } else {
        console.log("user:", user);
        user.messenger = {
          id: senderID
        };
        user.save();
      }
    })
  })

  var messageId = message.mid;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'image':
        sendImageMessage(senderID, pageId);
        break;

      case 'button':
        sendButtonMessage(senderID, pageId);
        break;

      case 'generic':
        sendGenericMessage(senderID, pageId);
        break;

      case 'receipt':
        sendReceiptMessage(senderID, pageId);
        break;

      default:
        sendTextMessage(senderID, messageText, pageId);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received", pageId);
  }
};

function receiveReadMessage() {
  console.log("The message has been read:");
};

function receivedDeliveryConfirmation() {
  console.log("Message delivered");
}

function receivedAuthentication() {
  console.log("receivedAuthentication");
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful
  sendTextMessage(senderID, "Postback called");
}

/**************************************************************************************************************
 *  What do we want to send?
 **************************************************************************************************************/
function sendButtonMessage(recipientId, pageId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment:{
        type: `template`,
        payload: {
          template_type: `button`,
          text: `Please signup first!`,
          buttons:[
            {
              type: `web_url`,
              url: `${config.host}/auth/facebook/`,
              title: `Sign up`
            },
            {
              type: `postback`,
              title: `No, I don't want to`,
              payload: `DEVELOPER_DEFINED_PAYLOAD`
            }
          ]
        }
      }
    },
    pageId: pageId
  };

  callSendAPI(messageData);
};

function sendGenericMessage(recipientId, pageId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    pageId: pageId,
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}

function sendPagesChoice(recipientId, pages) {
  console.log("the pages length:", pages.length)
  const buttons = pages.map((page) => {
      return {
        type: 'postback',
        title: `test`
      }
  });

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Testt"
    }
  };

  // var messageData = {
  //   recipient: {
  //     id: recipientId
  //   },
  //   message: {
  //     attachment:{
  //       type: 'template',
  //       payload: {
  //         template_type: 'button',
  //         text: 'Please signup first!',
  //         buttons: buttons
  //       }
  //     }
  //   }
  // };

  callSendAPI(messageData);
};

function sendTextMessage(recipientId, messageText, pageId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    },
    pageId: pageId
  };

  callSendAPI(messageData);
}

/**************************************************************************************************************
 *  Final step, send the message
 **************************************************************************************************************/
function callSendAPI(messageData) {
  // Get the good page accessToken
  let pageAccessToken = process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN;
  config.pages.forEach((page) => {
    if(page.id == messageData.pageId) {
      pageAccessToken = page.accessToken;
    }
  });

  // console.log("recipient:", messageData.recipient.id);
  // messageData.recipient.id = '832119146888320';

  const requestOption = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: pageAccessToken },
    method: 'POST',
    json: messageData
  };

  requestPromise(requestOption)
  .then((result) => {
    let recipientId = result.recipient_id;
    let messageId = result.message_id;
    return true;
  })
  .catch((err) => {
    if(err) {
      console.error("ERROR, callSendAPI with messageData, error is : ", (err.error && err.error.error) ? err.error.error.message : err.error);
    }
  });
}




/**************************************************************************************************************
 *  OTHER
 **************************************************************************************************************/
function makeUserChooseHisPage(user) {
  getFacebookPagesFor(user.facebook.access_token)
  .then(sendPagesChoice.bind(null, user.facebook.id))
  .then((res) => {
    return true;
  })
  .catch((err) => {
    console.log("ERROR:", err);
  })
}



/**************************************************************************************************************
 *  MAIN
 **************************************************************************************************************/
function getFacebookPagesFor(userToken) {
  return new Promise((resolve, reject) => {
    FB.setAccessToken(userToken);
    FB.api('/me/accounts', (res) => {
      if(res.error) return reject(res.error);
      resolve(res.data)
    })
  })
}

// For the specific page, subscribe to it so that I can receive all the
// new events based on the permission I asked at the beginning
function subscribeToPage(pageId, pageAccessToken) {
  return new Promise((resolve, reject) => {
    FB.setAccessToken(pageAccessToken);

    const apiUrl = `/${pageId}/subscribed_apps`;

    FB.api(apiUrl, 'post', (res) => {
      if(res.error) return reject(res.error);
      resolve(res);
    })
  })
}

// Do it one time. This is for my app (marketer). It hads a subscription for the app
// so that I can receive all the webhook to a certain URL
function addSubscriptionForMyApp() {
  return new Promise((resolve, reject) => {
    FB.setAccessToken(process.env.FACEBOOK_APP_ACCESS_TOKEN);

    const callbackUrl = `${config.host}/facebook/message/receive`;
    const object = 'page';
    const verify_token = process.env.WEBHOOK_VERIFY_TOKEN;
    const field = [];
    const apiUrl = `/${process.env.FACEBOOK_APP_ID}/subscriptions?callback_url=${callbackUrl}&object=${object}&verify_token=${verify_token}`;

    FB.api(`${apiUrl}`, 'post', (res) => {
      console.log("App subscriptions:", res);
      if(res.error) return reject(res.error);
      resolve(res);
    });
  });
}

// Receive all the subscription I have with my app
function getMyAppSubscriptions() {
  FB.setAccessToken(process.env.FACEBOOK_APP_ACCESS_TOKEN);
  FB.api(`/${process.env.FACEBOOK_APP_ID}/subscriptions`, (res) => {
    console.log("My app subscriptions:", res);
  });
}


/**
 * MAIN
 */
function main() {
  getFacebookPagesFor(process.env.FACEBOOK_MY_ACCESS_TOKEN)
  .then((pages) => {
    const chosenPage = pages[1];
    return subscribeToPage(pages[1].id, pages[1].access_token);
  })
  .then((res) => {
    console.log("SUCCESS subscribing to page:", res);
  })
  .catch((err) => {
    console.log("ERROR:", err);
  })
}

// getMyAppSubscriptions();
// addSubscriptionForMyApp();
// main();











// var graph = require('fbgraph');
// graph.setAccessToken(facebookPageAccessToken);
// let pageIdFrankeDudy = 236145860112803;
// let myFacebookAccessToken = "EAALoR1FU8ycBAEJVc5kSxHLyWyywN9FyBZBaMtmJcCvHkE7mzwjDWWzIYm5O7SGMCaRSKdlPG3Uh0vvXHajYeI0Tu7aqJEJqLkCQMvE0pK9XJbAAefLglwrqv41IFURYPR46cKZCnffyRuuQRZBmWoA56ZCkkjYZD";
// let facebookPageAccessToken = "EAALoR1FU8ycBAH0OzRPZAPZCsxKDIaw9DeXLtZBTFmOfBH9wDGQre00TMkANP0jgvaOZCfyZCDUFNKUGF6kGrJdY2L4jjKaidlcAWoIZAI3ULw6S0nUi9s8e2u11xRYhwyblceDmOEbO1mTxLMdQc4TwfLsgfg27IZD"

// class FacebookService {
//   constructor() {

//   }

//   postOnFacebook(params, pageId, cb) {
//     if(!params) return cb("Missing params for posting on Facebook");
//     if(!params.message) return cb("Need message in the params to post on Facebook");

//     pageId = pageIdFrankeDudy //pageId || pageIdFrankeDudy;

//     console.log("Trying to post on Facebook with params", params);

//     if(params.link) {
//       graph.post('/' + pageId + '/feed?message=' + params.message + '&link=' + params.link, (err, res) => {
//         if(err) return cb(err);
//         console.log("Response of Facebook page post with link:", res);
//         return cb(null, true);
//       });
//     } else {
//       graph.post('/' + pageId + '/feed?message=' + params.message, (err, res) => {
//         if(err) return cb(err);
//         console.log("Response of Facebook page post NO link:", res);
//         return cb(null, true);
//       });
//     }
//   };

//   test() {
//     console.log("It works: ", this.name);
//   }
// }

// module.exports = FacebookService;
