/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV === undefined) {
	  __webpack_require__(1).config();
	}

	var express = __webpack_require__(2);
	var config = __webpack_require__(3);
	var glob = __webpack_require__(5);
	var mongoose = __webpack_require__(6);

	mongoose.Promise = global.Promise;
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', function () {
	  throw new Error('unable to connect to database at ' + config.db);
	});

	var models = glob.sync(config.root + '/models/*.js');
	models.forEach(function (model) {
	  __webpack_require__(7)(model);
	});

	var app = express();

	__webpack_require__(20)(app, config);

	app.listen(config.port, config.ip, function () {
	  console.log('Express server listening on port ' + config.port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var path = __webpack_require__(4),
	    rootPath = path.normalize(__dirname + '/..'),
	    env = process.env.NODE_ENV || 'development';

	var config = {
	  development: {
	    root: rootPath,
	    app: {
	      name: 'bot'
	    },
	    host: 'https://8f89c350.ngrok.io',
	    port: 3000,
	    db: process.env.MONGOLAB_URI,
	    facebook: {
	      callbackURL: 'http://localhost:3000/auth/facebook/callback'
	    },
	    pages: [{ id: '236145860112803', accessToken: 'EAALoR1FU8ycBAAfLdJXnXxVzJySjDgA9E9SYkG3oIT1CaKCux3u3abjHXxsVa9FWpTW7syCjuQH1fVzRmr6u8ZCmq4TzzZBu9ZB5O9ZAwTOdPxpo9A7IyjeZA0SEgeQiPgduBqQovo5JZAPGQ8eK3sVGKq74Cb0DwZD' }, { id: '1708037166106443', accessToken: 'EAALoR1FU8ycBAJM49b9FfBLIpIwhYxwajM00lziekSRchBSxaKRMmj0m9xgK4wU1XWZAdCOI6cdZB4OnVdTxYInrxZBSGGWZCwWZCkz471Oy8zZBZCxm8V9KZAoM78qJYyWZAZAs4L4LXR3cRihoHUZCwKnomKUzOKov5BrHpPyA4g6TwZDZD' }]
	  },

	  production: {
	    root: rootPath,
	    app: {
	      name: 'bot'
	    },
	    host: 'https://personal-bot-marketer.appspot.com', //'http://app-marketer.herokuapp.com',
	    ip: process.env.IP || '0.0.0.0',
	    port: process.env.PORT || 3000,
	    db: process.env.MONGOLAB_URI,
	    facebook: {
	      callbackURL: 'https://app-marketer.herokuapp.com/auth/facebook/callback'
	    }
	  }
	};

	module.exports = config[env];
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("glob");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./auth/facebook/index": 8,
		"./auth/facebook/index.js": 8,
		"./auth/facebook/passport": 11,
		"./auth/facebook/passport.js": 11,
		"./auth/index": 19,
		"./auth/index.js": 19,
		"./config/config": 3,
		"./config/config.js": 3,
		"./config/express": 20,
		"./config/express.js": 20,
		"./controllers/home": 28,
		"./controllers/home.js": 28,
		"./models/user": 15,
		"./models/user.js": 15,
		"./services/botkit": 29,
		"./services/botkit.js": 29,
		"./services/facebook": 17,
		"./services/facebook.js": 17,
		"./services/messenger": 32,
		"./services/messenger.js": 32,
		"./services/slack": 33,
		"./services/slack.js": 33,
		"./services/twilio": 34,
		"./services/twilio.js": 34,
		"./services/wit": 38,
		"./services/wit.js": 38
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 7;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(2);
	var passport = __webpack_require__(9);
	var request_promise = __webpack_require__(10);
	var router = express.Router();

	router.get('/', passport.authenticate('facebook', {
	  scope: ['email', 'manage_pages', 'publish_pages', 'pages_manage_cta', 'read_page_mailboxes'],
	  session: false
	}));

	router.get('/callback', passport.authenticate('facebook', {
	  session: false
	}), function (req, res, user) {
	  return res.send("Welcome!");
	});

	// .post('/', passport.authenticate('facebook-token', {
	//   scope: ['email', 'user_posts'],
	//   session: false
	// }));

	module.exports = router;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("request-promise");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var passport = __webpack_require__(9);
	var _ = __webpack_require__(12);
	var FacebookStrategy = __webpack_require__(13).Strategy;
	var FacebookTokenStrategy = __webpack_require__(14);
	var User = __webpack_require__(15);
	var FacebookService = __webpack_require__(17);

	exports.setup = function (User, config) {
	  passport.use(new FacebookStrategy({
	    clientID: process.env.FACEBOOK_APP_ID,
	    clientSecret: process.env.FACEBOOK_APP_SECRET,
	    callbackURL: config.facebook.callbackURL,
	    profileFields: ['id', 'displayName', 'email'],
	    scope: ['email', 'manage_pages', 'publish_pages', 'pages_manage_cta', 'read_page_mailboxes']
	  }, function (accessToken, refreshToken, profile, done) {
	    profile._json.access_token = accessToken;
	    profile._json.refresh_token = refreshToken;
	    console.log("Success getting the profile:");

	    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
	      if (err) {
	        return done(err);
	      }
	      if (!user) {
	        user = new User({
	          name: profile.displayName,
	          email: profile.emails[0].value,
	          role: 'user',
	          username: profile.username,
	          provider: 'facebook',
	          facebook: profile._json
	        });
	      } else {
	        user = _.merge(user, {
	          name: profile.displayName,
	          email: profile.emails[0].value,
	          username: profile.username,
	          facebook: profile._json
	        });
	        user.markModified('facebook');
	      }
	      user.save(function (err) {
	        if (err) return done(err);

	        // New user!
	        FacebookService.makeUserChooseHisPage(user);

	        done(err, user);
	      });
	    });
	  }));

	  // passport.use(new FacebookTokenStrategy({
	  //     clientID: process.env.FACEBOOK_APP_ID,
	  //     clientSecret: process.env.FACEBOOK_SECRET,
	  //     callbackURL: "http://localhost:9000/auth/facebook/callback",
	  //     authorizationURL: 'https://www.facebook.com/v2.5/dialog/oauth',
	  //     profileURL: 'https://graph.facebook.com/v2.5/me',
	  //     profileFields: ['id', 'displayName', 'email']
	  //   },
	  //   function (accessToken, refreshToken, profile, done) {
	  //     profile._json.access_token = accessToken;
	  //     profile._json.refresh_token = refreshToken;
	  //     console.log("accessToken:", accessToken);
	  //     console.log("refreshToken:", refreshToken);
	  //     console.log("profile:", profile);
	  //     done(null,profile);
	  //   }
	  // ));
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("passport-facebook");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("passport-facebook-token");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(6);
	var Schema = mongoose.Schema;
	var crypto = __webpack_require__(16);
	var authTypes = ['github', 'twitter', 'facebook', 'google'];

	var UserSchema = new Schema({
	  name: String,
	  email: { type: String, lowercase: true },
	  role: { type: String, default: 'user' },
	  hashedPassword: String,
	  provider: String,
	  salt: String,
	  settings: {},
	  facebook: {},
	  messenger: {}
	});

	/**
	 * Virtuals
	 */
	UserSchema.virtual('password').set(function (password) {
	  this._password = password;
	  this.salt = this.makeSalt();
	  this.hashedPassword = this.encryptPassword(password);
	}).get(function () {
	  return this._password;
	});

	// Public profile information
	UserSchema.virtual('profile').get(function () {
	  return {
	    '_id': this._id,
	    'name': this.name,
	    'role': this.role
	  };
	});

	// Non-sensitive info we'll be putting in the token
	UserSchema.virtual('token').get(function () {
	  return {
	    '_id': this._id,
	    'role': this.role
	  };
	});

	/**
	 * Validations
	 */

	// Validate empty email
	UserSchema.path('email').validate(function (email) {
	  if (authTypes.indexOf(this.provider) !== -1) return true;
	  return email.length;
	}, 'Email cannot be blank');

	// Validate empty password
	UserSchema.path('hashedPassword').validate(function (hashedPassword) {
	  if (authTypes.indexOf(this.provider) !== -1) return true;
	  return hashedPassword.length;
	}, 'Password cannot be blank');

	// Validate email is not taken
	UserSchema.path('email').validate(function (value, respond) {
	  var self = this;
	  this.constructor.findOne({ email: value }, function (err, user) {
	    if (err) throw err;
	    if (user) {
	      if (self.id === user.id) return respond(true);
	      return respond(false);
	    }
	    respond(true);
	  });
	}, 'The specified email address is already in use.');

	var validatePresenceOf = function validatePresenceOf(value) {
	  return value && value.length;
	};

	/**
	 * Pre-save hook
	 */
	UserSchema.pre('save', function (next) {
	  if (!this.isNew) return next();

	  if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1) next(new Error('Invalid password'));else next();
	});

	/**
	 * Methods
	 */
	UserSchema.methods = {
	  /**
	   * Authenticate - check if the passwords are the same
	   *
	   * @param {String} plainText
	   * @return {Boolean}
	   * @api public
	   */
	  authenticate: function authenticate(plainText) {
	    return this.encryptPassword(plainText) === this.hashedPassword;
	  },

	  /**
	   * Make salt
	   *
	   * @return {String}
	   * @api public
	   */
	  makeSalt: function makeSalt() {
	    return crypto.randomBytes(16).toString('base64');
	  },

	  /**
	   * Encrypt password
	   *
	   * @param {String} password
	   * @return {String}
	   * @api public
	   */
	  encryptPassword: function encryptPassword(password) {
	    if (!password || !this.salt) return '';
	    var salt = new Buffer(this.salt, 'base64');
	    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	  }
	};

	module.exports = mongoose.model('User', UserSchema);

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(3);
	var requestPromise = __webpack_require__(10);
	var FB = __webpack_require__(18);
	var User = __webpack_require__(15);

	module.exports = {
	  receivedMessage: receivedMessage,
	  receivedAuthentication: receivedAuthentication,
	  receivedDeliveryConfirmation: receivedDeliveryConfirmation,
	  receivedPostback: receivedPostback,
	  receiveReadMessage: receiveReadMessage,
	  sendButtonMessage: sendButtonMessage,
	  sendTextMessage: sendTextMessage,
	  sendGenericMessage: sendGenericMessage,
	  makeUserChooseHisPage: makeUserChooseHisPage,
	  callSendAPI: callSendAPI
	};

	/**************************************************************************************************************
	 *  Received a message from webhook!
	 **************************************************************************************************************/
	function receivedMessage(event) {
	  console.log("event:", event);
	  var senderID = event.sender.id;
	  var recipientID = event.recipient.id;
	  var timeOfMessage = event.timestamp;
	  var message = event.message;
	  var pageId = event.pageId;

	  console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);

	  // Get the profile of the user
	  FB.setAccessToken(process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN);
	  FB.api('' + senderID, function (res) {
	    console.log("the profile of the user:", res);
	    // Do we already have him?
	    User.findOne({ name: new RegExp('^' + res.first_name + '$', "i") }, function (err, user) {
	      if (err) {
	        console.log("ERROR:", err);
	        return;
	      }

	      if (!user) {
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
	    });
	  });

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
	      attachment: {
	        type: 'template',
	        payload: {
	          template_type: 'button',
	          text: 'Please signup first!',
	          buttons: [{
	            type: 'web_url',
	            url: config.host + '/auth/facebook/',
	            title: 'Sign up'
	          }, {
	            type: 'postback',
	            title: 'No, I don\'t want to',
	            payload: 'DEVELOPER_DEFINED_PAYLOAD'
	          }]
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
	              payload: "Payload for first bubble"
	            }]
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
	              payload: "Payload for second bubble"
	            }]
	          }]
	        }
	      }
	    }
	  };

	  callSendAPI(messageData);
	}

	function sendPagesChoice(recipientId, pages) {
	  console.log("the pages length:", pages.length);
	  var buttons = pages.map(function (page) {
	    return {
	      type: 'postback',
	      title: 'test'
	    };
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
	  var pageAccessToken = process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN;
	  config.pages.forEach(function (page) {
	    if (page.id == messageData.pageId) {
	      pageAccessToken = page.accessToken;
	    }
	  });

	  // console.log("recipient:", messageData.recipient.id);
	  // messageData.recipient.id = '832119146888320';

	  var requestOption = {
	    uri: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: { access_token: pageAccessToken },
	    method: 'POST',
	    json: messageData
	  };

	  requestPromise(requestOption).then(function (result) {
	    var recipientId = result.recipient_id;
	    var messageId = result.message_id;
	    return true;
	  }).catch(function (err) {
	    if (err) {
	      console.error("ERROR, callSendAPI with messageData, error is : ", err.error && err.error.error ? err.error.error.message : err.error);
	    }
	  });
	}

	/**************************************************************************************************************
	 *  OTHER
	 **************************************************************************************************************/
	function makeUserChooseHisPage(user) {
	  getFacebookPagesFor(user.facebook.access_token).then(sendPagesChoice.bind(null, user.facebook.id)).then(function (res) {
	    return true;
	  }).catch(function (err) {
	    console.log("ERROR:", err);
	  });
	}

	/**************************************************************************************************************
	 *  MAIN
	 **************************************************************************************************************/
	function getFacebookPagesFor(userToken) {
	  return new Promise(function (resolve, reject) {
	    FB.setAccessToken(userToken);
	    FB.api('/me/accounts', function (res) {
	      if (res.error) return reject(res.error);
	      resolve(res.data);
	    });
	  });
	}

	// For the specific page, subscribe to it so that I can receive all the
	// new events based on the permission I asked at the beginning
	function subscribeToPage(pageId, pageAccessToken) {
	  return new Promise(function (resolve, reject) {
	    FB.setAccessToken(pageAccessToken);

	    var apiUrl = '/' + pageId + '/subscribed_apps';

	    FB.api(apiUrl, 'post', function (res) {
	      if (res.error) return reject(res.error);
	      resolve(res);
	    });
	  });
	}

	// Do it one time. This is for my app (marketer). It hads a subscription for the app
	// so that I can receive all the webhook to a certain URL
	function addSubscriptionForMyApp() {
	  return new Promise(function (resolve, reject) {
	    FB.setAccessToken(process.env.FACEBOOK_APP_ACCESS_TOKEN);

	    var callbackUrl = config.host + '/facebook/message/receive';
	    var object = 'page';
	    var verify_token = process.env.WEBHOOK_VERIFY_TOKEN;
	    var field = [];
	    var apiUrl = '/' + process.env.FACEBOOK_APP_ID + '/subscriptions?callback_url=' + callbackUrl + '&object=' + object + '&verify_token=' + verify_token;

	    FB.api('' + apiUrl, 'post', function (res) {
	      console.log("App subscriptions:", res);
	      if (res.error) return reject(res.error);
	      resolve(res);
	    });
	  });
	}

	// Receive all the subscription I have with my app
	function getMyAppSubscriptions() {
	  FB.setAccessToken(process.env.FACEBOOK_APP_ACCESS_TOKEN);
	  FB.api('/' + process.env.FACEBOOK_APP_ID + '/subscriptions', function (res) {
	    console.log("My app subscriptions:", res);
	  });
	}

	/**
	 * MAIN
	 */
	function main() {
	  getFacebookPagesFor(process.env.FACEBOOK_MY_ACCESS_TOKEN).then(function (pages) {
	    var chosenPage = pages[1];
	    return subscribeToPage(pages[1].id, pages[1].access_token);
	  }).then(function (res) {
	    console.log("SUCCESS subscribing to page:", res);
	  }).catch(function (err) {
	    console.log("ERROR:", err);
	  });
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

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("fb");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(2);
	var passport = __webpack_require__(9);
	var config = __webpack_require__(3);
	var router = express.Router();
	var User = __webpack_require__(15);

	// Passport Configuration
	__webpack_require__(11).setup(User, config);

	router.use('/facebook', __webpack_require__(8));

	module.exports = router;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(2);
	var glob = __webpack_require__(5);

	var favicon = __webpack_require__(21);
	var logger = __webpack_require__(22);
	var cookieParser = __webpack_require__(23);
	var bodyParser = __webpack_require__(24);
	var compress = __webpack_require__(25);
	var methodOverride = __webpack_require__(26);

	module.exports = function (app, config) {
	  var env = process.env.NODE_ENV || 'development';
	  app.locals.ENV = env;
	  app.locals.ENV_DEVELOPMENT = env == 'development';

	  app.set('views', config.root + '/views');
	  app.set('view engine', 'ejs');

	  // app.use(favicon(config.root + '/public/img/favicon.ico'));
	  app.use(logger('dev'));
	  app.use(bodyParser.json());
	  app.use(bodyParser.urlencoded({
	    extended: true
	  }));
	  app.use(cookieParser());
	  app.use(compress());
	  app.use(express.static(config.root + '/public'));
	  app.use(methodOverride());

	  var controllers = glob.sync(config.root + '/controllers/*.js');
	  controllers.forEach(function (controller) {
	    __webpack_require__(27)(controller)(app);
	  });

	  // var services = glob.sync(config.root + '/services/*.js');
	  // services.forEach(function (service) {
	  //   require(service)(app);
	  // });

	  app.use(function (req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	  });

	  if (app.get('env') === 'development') {
	    app.use(function (err, req, res, next) {
	      res.status(err.status || 500);
	      res.render('error', {
	        message: err.message,
	        error: err,
	        title: 'error'
	      });
	    });
	  }

	  app.use(function (err, req, res, next) {
	    console.log("ERROR 500 FUCK:", err);
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: {},
	      title: 'error'
	    });
	  });
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("method-override");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./config": 3,
		"./config.js": 3,
		"./express": 20,
		"./express.js": 20
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 27;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(3);
	var express = __webpack_require__(2);
	var router = express.Router();
	var mongoose = __webpack_require__(6);
	var FB = __webpack_require__(18);
	var requestPromise = __webpack_require__(10);
	// const FacebookService = require('../services/facebook');
	var facebook_handler = __webpack_require__(29).handler;

	module.exports = function (app) {
	  app.use('/', router);
	};

	/**
	 * Routes
	 */
	router.use('/auth', __webpack_require__(19));

	router.get('/facebook/pages/chose', function (req, res) {
	  res.send("Okay great");
	});

	router.post('/facebook/message/receive', function (req, res) {
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
	});

	router.get('/facebook/message/receive', function (req, res) {
	  if (req.query['hub.mode'] == 'subscribe') {
	    if (req.query['hub.verify_token'] == process.env.WEBHOOK_VERIFY_TOKEN) {
	      res.send(req.query['hub.challenge']);
	    } else {
	      res.send('OK');
	    }
	  }
	});

	// Do it one time. This is for my app (marketer). It hads a subscription for the app
	// so that I can receive all the webhook to a certain URL
	FB.setAccessToken(process.env.FACEBOOK_APP_ACCESS_TOKEN);
	var callbackUrl = config.host + '/facebook/message/receive';
	var object = 'page';
	var verify_token = process.env.WEBHOOK_VERIFY_TOKEN;
	var field = [];
	var apiUrl = '/' + process.env.FACEBOOK_APP_ID + '/subscriptions?callback_url=' + callbackUrl + '&object=' + object + '&verify_token=' + verify_token;
	FB.api('' + apiUrl, 'post', function (res) {
	  if (!res.error) {
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

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Botkit = __webpack_require__(30);
	var mongoUri = process.env.MONGOLAB_URI;
	// var db = require('../../config/db')({mongoUri: mongoUri})
	var request = __webpack_require__(31);

	var controller = Botkit.facebookbot({
	  debug: true,
	  access_token: process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN,
	  verify_token: process.env.WEBHOOK_VERIFY_TOKEN
	  // storage: db
	});

	var bot = controller.spawn({});

	//1708037166106443 WHITEFRAME
	//236145860112803 FRANKY

	// subscribe to page events
	request.post('https://graph.facebook.com/me/subscribed_apps?access_token=' + process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN, function (err, res, body) {
	  if (err) {
	    controller.log('Could not subscribe to page messages');
	  } else {
	    controller.log('Successfully subscribed to Facebook events:', body);
	    console.log('Botkit activated');

	    // start ticking to send conversation messages
	    controller.startTicking();
	  }
	});

	// this is triggered when a user clicks the send-to-messenger plugin
	controller.on('facebook_optin', function (bot, message) {
	  bot.reply(message, 'Welcome, friend');
	});

	// user said hello
	controller.hears(['hello', 'hey', 'salut', 'hi', 'yo'], 'message_received', function (bot, message) {
	  bot.reply(message, 'Hey there.');
	});

	// user say thanks
	controller.hears(['thank', 'thank you', 'thanks', 'merci'], 'message_received', function (bot, message) {
	  bot.reply(message, 'You are welcome!');
	});

	controller.hears(['convo'], 'message_received', function (bot, message) {
	  var postMessage = "";
	  var postLink = "";
	  var postPage = "";

	  var askForMessage = function askForMessage(response, convo) {
	    convo.ask('What is your post message? (Psstt! cancel at any time by saying *cancel*)', function (response, convo) {
	      postMessage = response.text;
	      convo.say('Awesome.');
	      askForLink(response, convo);
	      convo.next();
	    });
	  };
	  var askForLink = function askForLink(response, convo) {
	    convo.ask('What is the link of your post? (Ex: www.google.ca)', function (response, convo) {
	      if (response.text == "cancel") convo.stop();
	      postLink = response.text.replace('<', '').replace('>', '').split('|')[0];
	      convo.say('Ok. Thanks');
	      askForPages(response, convo);
	      convo.next();
	    });
	  };
	  var askForPages = function askForPages(response, convo) {
	    convo.ask('On what page do you want to post?', function (response, convo) {
	      if (response.text == "cancel") convo.stop();
	      postPage = response.text;
	      convo.say('Great! We will post *' + postMessage + '* with this link *' + postLink + '* on this Facebook page: *' + postPage + '*');
	      askForConfirm(response, convo);
	      convo.next();
	    });
	  };
	  var askForConfirm = function askForConfirm(response, convo) {
	    convo.ask('Say *confirm* to confirm, *restart* to restart the process, *cancel* to quit.', function (response, convo) {
	      if (response.text === 'cancel') convo.stop();
	      if (response.text === 'confirm') {
	        // var values = convo.extractResponses();
	        FacebookVar.postOnFacebook({ message: postMessage, link: postLink }, postPage, function (err) {
	          if (err) {
	            convo.say(err.message);
	          } else {
	            convo.say('Done! Bye bye!');
	            convo.next();
	          }
	        });
	      } else if (response.text === 'restart') {
	        convo.stop();
	        bot.startConversation(message, askForMessage);
	      } else {
	        convo.say("Hmm, I couldn't understand.");
	        convo.repeat();
	      }
	    });
	  };

	  bot.startConversation(message, askForMessage);
	});

	// user says anything else
	controller.hears('(.*)', 'message_received', function (bot, message) {
	  bot.reply(message, 'you said ' + message.match[1]);
	});

	// this function processes the POST request to the webhook
	var handler = function handler(obj) {
	  controller.debug('GOT A MESSAGE HOOK');
	  var message;
	  if (obj.entry) {
	    for (var e = 0; e < obj.entry.length; e++) {
	      for (var m = 0; m < obj.entry[e].messaging.length; m++) {
	        var facebook_message = obj.entry[e].messaging[m];

	        // Set the access token based on where the message come
	        controller.config.access_token = facebook_message.recipient.id == '236145860112803' ? process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN : process.env.FACEBOOK_MY_PAGE_ACCESS_TOKEN_WHITEFRAME;

	        // normal message
	        if (facebook_message.message) {
	          message = {
	            text: facebook_message.message.text,
	            user: facebook_message.sender.id,
	            channel: facebook_message.sender.id,
	            timestamp: facebook_message.timestamp,
	            seq: facebook_message.message.seq,
	            mid: facebook_message.message.mid,
	            attachments: facebook_message.message.attachments
	          };
	          // save if user comes from m.me adress or Facebook search
	          // create_user_if_new(facebook_message.sender.id, facebook_message.timestamp)
	          controller.receiveMessage(bot, message);
	        }
	        // clicks on a postback action in an attachment
	        else if (facebook_message.postback) {
	            // trigger BOTH a facebook_postback event
	            // and a normal message received event.
	            // this allows developers to receive postbacks as part of a conversation.
	            message = {
	              payload: facebook_message.postback.payload,
	              user: facebook_message.sender.id,
	              channel: facebook_message.sender.id,
	              timestamp: facebook_message.timestamp
	            };

	            controller.trigger('facebook_postback', [bot, message]);

	            message = {
	              text: facebook_message.postback.payload,
	              user: facebook_message.sender.id,
	              channel: facebook_message.sender.id,
	              timestamp: facebook_message.timestamp
	            };

	            controller.receiveMessage(bot, message);
	          }
	          // When a user clicks on "Send to Messenger"
	          else if (facebook_message.optin) {
	              message = {
	                optin: facebook_message.optin,
	                user: facebook_message.sender.id,
	                channel: facebook_message.sender.id,
	                timestamp: facebook_message.timestamp
	              };

	              // save if user comes from "Send to Messenger"
	              create_user_if_new(facebook_message.sender.id, facebook_message.timestamp);

	              controller.trigger('facebook_optin', [bot, message]);
	            }
	            // message delivered callback
	            else if (facebook_message.delivery) {
	                message = {
	                  optin: facebook_message.delivery,
	                  user: facebook_message.sender.id,
	                  channel: facebook_message.sender.id,
	                  timestamp: facebook_message.timestamp
	                };

	                controller.trigger('message_delivered', [bot, message]);
	              } else {
	                // controller.log('Got an unexpected message from Facebook: ', facebook_message)
	              }
	      }
	    }
	  }
	};

	var create_user_if_new = function create_user_if_new(id, ts) {
	  console.log("new user?");
	  controller.storage.users.get(id, function (err, user) {
	    if (err) {
	      console.log(err);
	    } else if (!user) {
	      controller.storage.users.save({ id: id, created_at: ts });
	    }
	  });
	};

	exports.handler = handler;

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("botkit");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 32 */
/***/ function(module, exports) {

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
	"use strict";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TwillioService = __webpack_require__(34);
	var User = __webpack_require__(15);
	var Wit = __webpack_require__(38);
	var FacebookService = __webpack_require__(17);
	var FacebookVar = new FacebookService();
	var config = __webpack_require__(3);
	var Botkit = __webpack_require__(30).slackbot;
	var emoji = __webpack_require__(40);
	var apiai = __webpack_require__(41);
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
	exports.connectSlack = function (router) {
	  controller.createWebhookEndpoints(router, bot, function () {
	    console.log('SLACK bot is online!');
	  });
	};

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
	var slackAppConfig = {};
	if (config.db) {
	  var BotkitStorage = __webpack_require__(36);
	  slackAppConfig = {
	    storage: BotkitStorage({ mongoUri: config.db })
	  };
	}

	/*
	  Process
	 */
	var controller = void 0;
	var bot = void 0;
	createSlackBotController();
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
	    scopes: ['commands', 'bot']
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
	  bot.api.team.info({}, function (err, res) {
	    controller.storage.teams.save({ id: res.team.id }, function (err) {
	      if (err) {
	        console.error(err);
	      }
	    });
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
	    case "/facebookpost":
	      if (message.text === "" || message.text === "help") {
	        slashCommand.replyPrivate(message, "Don't forget to include the *message* of your post and an *optional* link");
	        return;
	      }

	      console.log("test:", message.text.split().length);
	      if (message.text.split(' ').length == 2) {
	        var postMessage = message.text.split(' ')[0];
	        var postLink = message.text.split(' ')[1];
	        FacebookVar.postOnFacebook({ message: postMessage, link: postLink });
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
	    attachments: [{
	      title: 'My buttons',
	      callback_id: '123',
	      attachment_type: 'default',
	      actions: [{
	        "name": "yes",
	        "text": "Yes!",
	        "value": "yes",
	        "type": "button"
	      }, {
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
	      }]
	    }]
	  });
	}

	/*
	  Handle direct message
	 */
	function handleDirectMessage(bot, message) {
	  // let wit = witbot.process(message.text, bot, message)
	  // bot.reply(message, 'What can I do for you?');
	  console.log("message:", message);
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
	  var postMessage = "";
	  var postLink = "";
	  var postPage = "";

	  var askForMessage = function askForMessage(response, convo) {
	    convo.ask('What is your post message? (Psstt! cancel at any time by saying *cancel*)', function (response, convo) {
	      postMessage = response.text;
	      convo.say('Awesome.');
	      askForLink(response, convo);
	      convo.next();
	    });
	  };
	  var askForLink = function askForLink(response, convo) {
	    convo.ask('What is the link of your post? (Ex: www.google.ca)', function (response, convo) {
	      if (response.text == "cancel") convo.stop();
	      postLink = response.text.replace('<', '').replace('>', '').split('|')[0];
	      convo.say('Ok. Thanks');
	      askForPages(response, convo);
	      convo.next();
	    });
	  };
	  var askForPages = function askForPages(response, convo) {
	    convo.ask('On what page do you want to post?', function (response, convo) {
	      if (response.text == "cancel") convo.stop();
	      postPage = response.text;
	      convo.say('Great! We will post *' + postMessage + '* with this link *' + postLink + '* on this Facebook page: *' + postPage + '*');
	      askForConfirm(response, convo);
	      convo.next();
	    });
	  };
	  var askForConfirm = function askForConfirm(response, convo) {
	    convo.ask('Say *confirm* to confirm, *restart* to restart the process, *cancel* to quit.', function (response, convo) {
	      if (response.text === 'cancel') convo.stop();
	      if (response.text === 'confirm') {
	        // var values = convo.extractResponses();
	        FacebookVar.postOnFacebook({ message: postMessage, link: postLink }, postPage, function (err) {
	          if (err) {
	            convo.say(err.message);
	          } else {
	            convo.say('Done! Bye bye!');
	            convo.next();
	          }
	        });
	      } else if (response.text === 'restart') {
	        convo.stop();
	        bot.startConversation(message, askForMessage);
	      } else {
	        convo.say("Hmm, I couldn't understand.");
	        convo.repeat();
	      }
	    });
	  };

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

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isTesting = true;

	var express = __webpack_require__(2);
	var router = express.Router();
	var twilio = __webpack_require__(35);
	var accountSid = isTesting ? process.env.TWILIO_TEST_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID;
	var authToken = isTesting ? process.env.TWILIO_TEST_AUTH_TOKEN : process.env.TWILIO_AUTH_TOKEN;
	var myTwilioNumber = isTesting ? '+15005550006' : process.env.TWILIO_NUMBER;
	var client = new twilio.RestClient(accountSid, authToken);
	var slackService = __webpack_require__(33);
	var config = __webpack_require__(3);
	var FacebookService = __webpack_require__(17);
	var FacebookVar = new FacebookService();

	var demoImage = "https://s3.amazonaws.com/marketer.ai/images/Group+2.png";

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

	exports.sendMediaMessage = function (to, text, image) {
	  client.messages.create({
	    body: text,
	    to: to,
	    from: myTwilioNumber,
	    mediaUrl: demoImage
	  }, function (err, message) {
	    if (err) {
	      console.log("ERROR:", err);
	    } else {
	      console.log("Success sending message with image :", message);
	    }
	  });
	};

	exports.receivedAMessage = function (messageBody) {
	  console.log("The message receveid: ", messageBody.Body);
	  if (messageBody.From[0] === '+') messageBody.From = messageBody.From.substr(1);
	  slackService.getChannelWithNumber(messageBody.From, function (channel) {
	    console.log("The channel based on the number:", channel.name);
	    slackService.sendMessageToChannel(channel.id, messageBody.Body);
	  });
	};

	var slackAppConfig = {};
	if (config.db) {
	  var _BotkitStorage = __webpack_require__(36);
	  slackAppConfig = {
	    storage: _BotkitStorage({ mongoUri: config.db })
	  };
	}

	var TwilioSMSBot = __webpack_require__(37);

	var BotkitStorage = __webpack_require__(36);
	slackAppConfig = {
	  storage: BotkitStorage({ mongoUri: config.db })
	};

	var controller = TwilioSMSBot({
	  storage: BotkitStorage({ mongoUri: config.db }),
	  account_sid: accountSid,
	  auth_token: authToken,
	  twilio_number: myTwilioNumber
	});

	var bot = controller.spawn({});

	controller.createWebhookEndpoints(router, bot, function () {
	  console.log('TWILIO Bot is online!');
	  if (isTesting) console.log("TESTING MODE");
	});

	// controller.setupWebserver(config.port, function (err, webserver) {
	//   controller.createWebhookEndpoints(controller.webserver, bot, function () {
	//     console.log('TwilioSMSBot is online!');
	//     if(isTesting) console.log("TESTING MODE");
	//   })
	// })

	/**
	 * Conversion for posting a link on Facebook
	 */
	controller.hears(['facebookpost', 'fbpost'], 'message_received', function (bot, message) {
	  var postMessage = "";
	  var postLink = "";
	  var postPage = "";

	  var askForMessage = function askForMessage(response, convo) {
	    convo.ask('What is your post message? (Psstt! cancel at any time by saying *cancel*)', function (response, convo) {
	      postMessage = response.text;
	      convo.say('Awesome.');
	      askForLink(response, convo);
	      convo.next();
	    });
	  };
	  var askForLink = function askForLink(response, convo) {
	    convo.ask('What is the link of your post? (Ex: www.google.ca)', function (response, convo) {
	      if (response.text == "cancel") convo.stop();
	      postLink = response.text.replace('<', '').replace('>', '').split('|')[0];
	      convo.say('Ok. Thanks');
	      askForPages(response, convo);
	      convo.next();
	    });
	  };
	  var askForPages = function askForPages(response, convo) {
	    convo.ask('On what page do you want to post?', function (response, convo) {
	      if (response.text == "cancel") convo.stop();
	      postPage = response.text;
	      convo.say('Great! We will post *' + postMessage + '* with this link *' + postLink + '* on this Facebook page: *' + postPage + '*');
	      askForConfirm(response, convo);
	      convo.next();
	    });
	  };
	  var askForConfirm = function askForConfirm(response, convo) {
	    convo.ask('Say *confirm* to confirm, *restart* to restart the process, *cancel* to quit.', function (response, convo) {
	      if (response.text === 'cancel') convo.stop();
	      if (response.text === 'confirm') {
	        // var values = convo.extractResponses();
	        FacebookVar.postOnFacebook({ message: postMessage, link: postLink }, postPage, function (err) {
	          if (err) {
	            convo.say(err.message);
	          } else {
	            convo.say('Done! Bye bye!');
	            convo.next();
	          }
	        });
	      } else if (response.text === 'restart') {
	        convo.stop();
	        bot.startConversation(message, askForMessage);
	      } else {
	        convo.say("Hmm, I couldn't understand.");
	        convo.repeat();
	      }
	    });
	  };

	  bot.startConversation(message, askForMessage);
	});

	/**
	 * Conversion for posting a link on Facebook
	 */
	controller.hears(['Hi', 'Hello', 'Hey', 'What up', 'Salut', 'Allo', 'Bonjour'], 'message_received', function (bot, message) {
	  var userName = "";
	  var userAge = "";
	  var userBudget = "";

	  // Do we already have the use?
	  console.log("DO we have this user? : ", message.user);
	  controller.storage.users.get(message.user, function (err, user) {
	    console.log("The user we have found:", user);
	    if (!user) {
	      user = {
	        id: message.user
	      };
	      controller.storage.users.save(user, function (err, id) {
	        // We have a new user so we need some of his info!
	        bot.startConversation(message, askForName);
	      });
	    } else {
	      if (user.name) {
	        bot.reply(message, 'Hello ' + user.name);
	      } else {
	        bot.startConversation(message, askForName);
	      }
	    }
	  });

	  var askForName = function askForName(response, convo) {
	    convo.say("Hey! I'm Mark! Your own personnal full-time marketing bot :D");
	    convo.ask("What's your name?", function (response, convo) {
	      userName = response.text;
	      convo.say('Beautiful name :)');
	      askForAge(response, convo);
	      convo.next();
	    });
	  };
	  var askForAge = function askForAge(response, convo) {
	    convo.ask('Can I ask how old are you?', function (response, convo) {
	      var isNumber = /^\d+$/.test(response.text);
	      if (isNumber) {
	        userAge = response.text;
	        if (parseInt(response.text) < 30) {
	          convo.say('WOW! Soooooo young!');
	        }
	        convo.say('Okay, good');
	        askForBudget(response, convo);
	        convo.next();
	      } else {
	        convo.say("Just give me the number please!");
	        convo.repeat();
	        convo.next();
	      }
	    });
	  };
	  var askForBudget = function askForBudget(response, convo) {
	    convo.ask('What will be your marketing budget this month? (Ex: 300$)', function (response, convo) {
	      var containDollarSign = response.text.includes('$');
	      if (containDollarSign) {
	        userBudget = response.text.split('$')[0];
	        convo.say("Great!");
	        convo.say("I'm done with you");
	        convo.say('Bye bye ' + userName + '. ' + userAge + ' years old with ' + userBudget + '$ in marketing budget ;)');
	        controller.storage.users.get(message.user, function (err, user) {
	          console.log("The user that we have:", user);
	          if (user) {
	            user.name = userName;
	            user.age = userAge;
	            user.budget = userBudget;
	            controller.storage.users.save(user);
	          }
	        });
	        convo.next();
	      } else {
	        convo.say("Hmm.. I didn't understand.. :(");
	        convo.repeat();
	        convo.next();
	      }
	    });
	  };
	});

	/**
	 * Send the user an example of Facebook post (DEMO)
	 * @param  {[type]} response [description]
	 * @param  {[type]} convo)   {               convo.say("Here's what I founded for you!");    exports.sendMediaMessage(message.from, "Here's your the Facebook post. :)" [description]
	 * @return {[type]}          [description]
	 */
	controller.hears(['give'], 'message_received, direct_message', function (bot, message) {
	  console.log("Heard *Give*");
	  setTimeout(function () {
	    bot.reply(message, "hugg");
	  }, 5000);
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
	controller.hears('.*', 'message_received', function (bot, message) {
	  console.log("Receveid Default Message:", message.text);
	  bot.reply(message, "huh? I'm not sure to understand ... :(");
	});

	exports.receiveSimpleMessage = function (message) {
	  console.log("test:", message);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("twilio");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("botkit-storage-mongo");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("botkit-sms");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Wit = __webpack_require__(39).Wit;
	var interactive = __webpack_require__(39).interactive;
	var accessToken = process.env.WIT_TOKEN;

	var WitService = function (_Wit) {
	  _inherits(WitService, _Wit);

	  function WitService(accessToken, actions) {
	    _classCallCheck(this, WitService);

	    return _possibleConstructorReturn(this, (WitService.__proto__ || Object.getPrototypeOf(WitService)).call(this, { accessToken: accessToken, actions: actions }));
	  }

	  _createClass(WitService, [{
	    key: 'startInteractive',
	    value: function startInteractive() {
	      interactive(this);
	    }
	  }, {
	    key: 'sendMessage',
	    value: function sendMessage(message, context) {
	      this.message(message, context).then(function (data) {
	        console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
	      }).catch(console.error);
	    }
	  }]);

	  return WitService;
	}(Wit);

	;

	var actions = {
	  send: function send(request, response) {
	    var sessionId = request.sessionId;
	    var context = request.context;
	    var entities = request.entities;
	    var text = response.text;
	    var quickreplies = response.quickreplies;

	    return new Promise(function (resolve, reject) {
	      console.log('user said...', request.text);
	      console.log('sending...', JSON.stringify(response));
	      return resolve();
	    });
	  }
	};

	var client = new WitService(accessToken, actions);

	/**
	 * Testing
	 */
	// client.sendMessage('Hello');

	module.exports = client;

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("node-wit");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("js-emoji");

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("apiai");

/***/ }
/******/ ]);