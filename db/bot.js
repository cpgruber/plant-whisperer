var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("../env") : process.env;
var Plant = require("../models/plant")
var Tweet = require("../models/tweet")
var Twit = require('twit');
var moment = require("moment");

var Bot = new Twit({
  consumer_key: env.consumerKey,
  consumer_secret: env.consumerSecret,
  access_token: env.accessToken,
  access_token_secret: env.tokenSecret
});

function makeTweet(tweetData){
  return new Tweet({
    createdAt: new Date(),
    tweetID: tweetData.id_str,
    myID: tweetData.user.id_str,
    recipientID:tweetData.entities.user_mentions[0].id_str
  })
}

//then tweet reminders
function postReminder(plantDoc){
  var content = "Hey @"+plantDoc.owner+"! Water your "+plantDoc.type+", please! 💧🌱"
  Bot.post('statuses/update', {status: content}, function (err,data,response){
    if (!err){
      var tweet = makeTweet(data);
      plantDoc.tweets.push(tweet);
      plantDoc.save(function(err){
        console.log("tweet posted!")
        if (err) console.log(err);
      })
    }else{
      console.log("tweet already posted")
    }
  })
}

function resetInterval(plantDoc){
  plantDoc.last_water =  moment();
  plantDoc.next_water= moment().add(plantDoc.frequency,plantDoc.interval)
  plantDoc.save(function(err){
    if (!err){
      console.log("new interval saved")
    }
  })
}

var now = moment();
Plant.find({'next_water':{
  "$lte":now.toDate()
}}, function (err, plants){
  plants.forEach(function(plant){
    postReminder(plant);
    resetInterval(plant);
  })
})
