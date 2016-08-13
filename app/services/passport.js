'use strict';

var User = require('../models/user');

let options = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'https://app-marketer/api/auth/facebook/callback'
};

passport.use(
  new FacebookStrategy( options,
    function(accessToken, refreshToken, profile, done) {
      console.log("Facebook profile", profile);
      User.findOrCreate({ facebookId: profile.id }, function (err, result) {
        if(result) {
          result.access_token = accessToken;
          result.save(function(err, doc) {
            done(err, doc);
          });
        } else {
          done(err, result);
        }
      });
    }
  )
);
