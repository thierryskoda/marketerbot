'use strict';

var passport = require('passport');
var _ = require('lodash');
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: config.facebook.callbackURL,
      profileFields: ['id', 'displayName', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
      profile._json.access_token = accessToken;
      profile._json.refresh_token = refreshToken;
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      console.log("profile:", profile);
      done(null,profile);
    }
  ));

  passport.use(new FacebookTokenStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://localhost:9000/auth/facebook/callback",
      authorizationURL: 'https://www.facebook.com/v2.5/dialog/oauth',
      profileURL: 'https://graph.facebook.com/v2.5/me',
      profileFields: ['id', 'displayName', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
      profile._json.access_token = accessToken;
      profile._json.refresh_token = refreshToken;
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      console.log("profile:", profile);
      done(null,profile);
    }
  ));
};
