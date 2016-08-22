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
    db: process.env.MONGOLAB_URI,
    facebook : {
      callbackURL : 'http://localhost:3000/auth/facebook/callback'
    }
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
    ip : process.env.IP || '0.0.0.0',
    port: process.env.PORT || 9000,
    db: process.env.MONGO_LAB_PROD_URI,
    facebook : {
      callbackURL : 'https://app-marketer.herokuapp.com/auth/facebook/callback'
    }
  }
};

module.exports = config[env];
