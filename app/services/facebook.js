'use strict'

var graph = require('fbgraph');

let pageIdFrankeDudy = 236145860112803;
let myFacebookAccessToken = "EAALoR1FU8ycBAKMcXb84hTgqKJ0uVvHFJQjV8uZCHmvKJtTywscQLEavHfV0qwnWjiPa9fOB8L501sdOKYfzKCUt9LusqpBhj7jbEp3YNWoPd5DzXvpWKjtldKOtMg4RJRXKYZBZCXipyK01rjSuYEM19jCcpAZD";
let facebookPageAccessToken = "EAALoR1FU8ycBAH0OzRPZAPZCsxKDIaw9DeXLtZBTFmOfBH9wDGQre00TMkANP0jgvaOZCfyZCDUFNKUGF6kGrJdY2L4jjKaidlcAWoIZAI3ULw6S0nUi9s8e2u11xRYhwyblceDmOEbO1mTxLMdQc4TwfLsgfg27IZD"
graph.setAccessToken(facebookPageAccessToken);


// graph.get('/236145860112803/?fields=access_token', (err, res) => {
//     console.log("test:", res)
// })

class FacebookService {
  constructor() {

  }

  postOnFacebook(params, pageId, cb) {
    if(!params) return cb("Missing params for posting on Facebook");
    if(!params.message) return cb("Need message in the params to post on Facebook");

    pageId = pageIdFrankeDudy //pageId || pageIdFrankeDudy;

    console.log("Trying to post on Facebook with params", params);

    if(params.link) {
      graph.post('/' + pageId + '/feed?message=' + params.message + '&link=' + params.link, (err, res) => {
        if(err) return cb(err);
        console.log("Response of Facebook page post with link:", res);
        return cb(null, true);
      });
    } else {
      graph.post('/' + pageId + '/feed?message=' + params.message, (err, res) => {
        if(err) return cb(err);
        console.log("Response of Facebook page post NO link:", res);
        return cb(null, true);
      });
    }
  };

  test() {
    console.log("It works: ", this.name);
  }
}

module.exports = FacebookService;
