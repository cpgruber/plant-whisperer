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

function getWeather(zip){
  var w = new Weather(env.wunderground);
  return new Promise(function(resolve,reject){
    w.conditions().request(zip, function(err, response){
      resolve(response.current_observation.temp_f);
    })
  })
}

getWeather(20001).then(function(temp){
  console.log("****************************")
  console.log("The temp is "+temp)
})
