'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../../config/config');
var router = express.Router();
var User = require('../models/user');

// Passport Configuration
require('./facebook/passport').setup(User, config);

router.use('/facebook', require('./facebook'));

module.exports = router;
