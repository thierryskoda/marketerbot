var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'bot'
    },
    host: 'https://8f89c350.ngrok.io',
    port: 3000,
    db: process.env.MONGOLAB_URI,
    facebook : {
      callbackURL : 'http://localhost:3000/auth/facebook/callback'
    },
    pages : [
      {id:'236145860112803', accessToken: 'EAALoR1FU8ycBAAfLdJXnXxVzJySjDgA9E9SYkG3oIT1CaKCux3u3abjHXxsVa9FWpTW7syCjuQH1fVzRmr6u8ZCmq4TzzZBu9ZB5O9ZAwTOdPxpo9A7IyjeZA0SEgeQiPgduBqQovo5JZAPGQ8eK3sVGKq74Cb0DwZD'},
      {id:'1708037166106443', accessToken: 'EAALoR1FU8ycBAJM49b9FfBLIpIwhYxwajM00lziekSRchBSxaKRMmj0m9xgK4wU1XWZAdCOI6cdZB4OnVdTxYInrxZBSGGWZCwWZCkz471Oy8zZBZCxm8V9KZAoM78qJYyWZAZAs4L4LXR3cRihoHUZCwKnomKUzOKov5BrHpPyA4g6TwZDZD'}
    ]
  },

  production: {
    root: rootPath,
    app: {
      name: 'bot'
    },
    host: 'https://personal-bot-marketer.appspot.com', //'http://app-marketer.herokuapp.com',
    ip : process.env.IP || '0.0.0.0',
    port: process.env.PORT || 3000,
    db: process.env.MONGOLAB_URI,
    facebook : {
      callbackURL : 'https://app-marketer.herokuapp.com/auth/facebook/callback'
    }
  }
};

module.exports = config[env];
