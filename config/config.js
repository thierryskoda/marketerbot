var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'bot'
    },
    port: 3000,
    db: process.env.MONGO_LAB_DEV_URI
  },

  test: {
    root: rootPath,
    app: {
      name: 'bot'
    },
    port: 3000,
    db: 'mongodb://localhost/bot-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'bot'
    },
    ip : process.env.IP || '0.0.0.0'
    port: process.env.PORT || 9000,
    db: process.env.MONGO_LAB_PROD_URI
  },

  facebook : {
    'clientID'      : '818342958265127', // your App ID
    'clientSecret'  : '951cb0fe7b416425e1a07b2f34309c49', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  }
};

module.exports = config[env];
