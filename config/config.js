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
    port: 3000,
    db: ''
  },

  facebook : {
    'clientID'      : '818342958265127', // your App ID
    'clientSecret'  : 'your-client-secret-here', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  }
};

module.exports = config[env];
