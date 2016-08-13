'use strict';

var express = require('express');
var passport = require('passport');
var request_promise = require('request-promise');
var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'manage_pages', 'publish_pages', 'pages_manage_cta', 'read_page_mailboxes'],
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
    session: false
  }))

  // .post('/', passport.authenticate('facebook-token', {
  //   scope: ['email', 'user_posts'],
  //   session: false
  // }));

module.exports = router;
