var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("../env") : process.env;
var Plant = require("../models/plant")
var Tweet = require("../models/tweet")
var Twit = require('twit');
var moment = require("moment");
var Weather = require('wundergroundnode');

var Bot = new Twit({
  consumer_key: env.consumerKey,
  consumer_secret: env.consumerSecret,
  access_token: env.accessToken,
  access_token_secret: env.tokenSecret
});

//first check for plants that need reminders
function remind(){
  var now = moment();
  Plant.find({'next_water':{
    "$lte":now.toDate()
  }}, function (err, plants){
    plants.forEach(function(plant){
      console.log("posting tweet...")
      postReminder(plant);
    });
  });
}

function makeTweet(tweetData){
  return new Tweet({
    createdAt: new Date(),
    tweetID: tweetData.id_str,
    myID: tweetData.user.id_str,
    recipientID:tweetData.entities.user_mentions[0].id_str,
    response: false,
    need: "water"
  })
}

//then tweet reminders
function postReminder(plantDoc){
  var content = "Hey @"+plantDoc.owner+"! Water your "+plantDoc.type+", please! 💧🌱"
  Bot.post('statuses/update', {status: content}, function (err,data,response){
    if (err) return err;
    var tweet = makeTweet(data);
    plantDoc.tweets.push(tweet);
    plantDoc.save(function(err){
      console.log("tweet posted!")
      if (err) console.log(err);
    })
  })
}

function checkResponse(){
  Plant.find({},function(err,plants){
    plants.forEach(function(plant){
      var tweets = plant.tweets.sort(function(b,a){return a.createdAt - b.createdAt});
      var lastTweet = tweets[0];
      // console.log(lastTweet)
      if (lastTweet){
        Bot.get('search/tweets',{q:"@Your_Plants",in_reply_to_status_id:lastTweet.tweetID,}, function(err, data, response) {
          var text = data.statuses[0].text;
          var tweetUserId = data.statuses[0].user.id_str;
          // console.log(text.indexOf("💧"))
          if (text.indexOf("💧") > -1 && tweetUserId == lastTweet.recipientID){
            console.log("thank you! resetting your interval")
          }
        })
      }
    })
  })
}

// remind();
checkResponse();

//then check latest tweets for each plant where response is false
//then check if these tweets have responses from their owner
//if yes, reset interval
//if no, set timer for next reminder

// function post (plant,content) {
//   Bot.post('statuses/update', { status: content }, function(err, data, response) {
//     if (err){console.log(err)}
//     // console.log(data);
//     console.log("tweeted!")
//     var tweet = new Tweet({
//       createdAt: new Date(),
//       tweetID: data.id_str,
//       response: false,
//       need: "water"
//     });
//     plant.tweets.push(tweet);
//     plant.save(function(err){
//       if (err){
//         console.log(err)
//       }
//     })
//   })
// }

// function reply (reply_id) {
//   Bot.post('statuses/update', { status: "Thanks!", in_reply_to_status_id: reply_id }, function(err, data, response) {
//     console.log("tweeted reply!")
//   })
// }

// var now = moment();
// Plant.find({'next_water':{
//   "$lte":now.toDate()
// }}, function (err, docs){
//   docs.forEach(function(doc){
//     var content = "Hey @"+doc.owner+"! Water your "+doc.type+"! 🌱";
//     console.log(content);
//     post(doc,content);
//   })
// })

// function getWeather(zip){
//   var w = new Weather(env.wunderground);
//   return new Promise(function(resolve,reject){
//     w.conditions().request(zip, function(err, response){
//       resolve(response.current_observation.temp_f);
//     })
//   })
// }
