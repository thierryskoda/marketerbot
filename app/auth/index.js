'use strict';

let express = require('express');
let passport = require('passport');
let config = require('../config/config');
let router = express.Router();
let User = require('../models/user');

// Passport Configuration
require('./facebook/passport').setup(User, config);

router.use('/facebook', require('./facebook'));

module.exports = router;
