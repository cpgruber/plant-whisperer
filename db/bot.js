var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("../env") : process.env;
var Plant = require("../models/plant")
var Twit = require('twit');
var moment = require("moment");
var Weather = require('wundergroundnode');

var Bot = new Twit({
  consumer_key: env.consumerKey,
  consumer_secret: env.consumerSecret,
  access_token: env.accessToken,
  access_token_secret: env.tokenSecret
});

function post (content) {
  Bot.post('statuses/update', { status: content }, function(err, data, response) {
    console.log("tweeted!")
  })
}

var now = moment();
// Plant.find({'next_water':{
//   "$lte":now.toDate()
// }}, function (err, docs){
//   docs.forEach(function(doc){
//     var tweet = "Hey @"+doc.owner+"! Water your "+doc.type+"!";
//     console.log(tweet)
//     post(tweet)
//   })
// })

var w = new Weather(env.wunderground);
w.conditions().request('20008', function(err, response){
    console.log(response);
})

//find all plants with next_water after now, tweet at the owners of those plants;
//Plant.find({next_water})
