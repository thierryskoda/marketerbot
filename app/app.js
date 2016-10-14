'use strict'

if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV === undefined) {
  require('dotenv').config();
}

let express = require('express');
let config = require('./config/config');
let glob = require('glob');
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/models/*.js');
models.forEach(function (model) {
  require(model);
});

let app = express();

require('./config/express')(app, config);

app.listen(config.port, config.ip, function () {
  console.log('Express server listening on port ' + config.port);
});
