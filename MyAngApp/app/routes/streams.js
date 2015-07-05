"use strict";
var express = require('express');
var dotenv = require('dotenv');
var router = express.Router();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

router.post('/gettimeline/:NAME', function(req,res) {
  var params = { screen_name: req.params.NAME };
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      console.log('SERVER success return tweets');
      res.json(tweets);
    } else {
      console.log('error SERVER');
      console.log(error);
    }
  });
});

module.exports = router;
