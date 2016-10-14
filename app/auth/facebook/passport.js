'use strict';

let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let FacebookTokenStrategy = require('passport-facebook-token');
let User = require('../../models/user');
let FacebookService = require('../../services/facebook');

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: config.facebook.callbackURL,
      profileFields: ['id', 'displayName', 'email'],
      scope: ['email', 'manage_pages', 'publish_pages', 'pages_manage_cta', 'read_page_mailboxes']
    },
    function (accessToken, refreshToken, profile, done) {
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
    }
  ));

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
