var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("../env") : process.env;
var Plant = require("../models/plant")
var Tweet = require("../models/tweet")
var Twit = require('twit');
var moment = require("moment");
// var Functions = require("./botMethods");
var Weather = require('wundergroundnode');

var Bot = new Twit({
  consumer_key: env.consumerKey,
  consumer_secret: env.consumerSecret,
  access_token: env.accessToken,
  access_token_secret: env.tokenSecret
});

var now = moment();
Plant.find({'next_water':{
  "$lte":now.toDate()
}}, function (err, plants){
  plants.forEach(function(plant){
    postReminder(plant);
    resetInterval(plant);
  })
})

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
      console.log("plant saved")
    }
  })
}

// function searchReplies(tweet){
//   return new Promise(function(resolve,reject){
//     Bot.get('search/tweets',{q:"@Your_Plants",in_reply_to_status_id:tweet.tweetID},function(err,data,response){
//       if (data.statuses.length > 0){
//         var text = data.statuses[0].text;
//         var tweetUserId = data.statuses[0].id_str;
//         if (text.indexOf("💧") > -1 && tweetUserId == tweet.recipientID){
//           console.log("thanks! resetting interval")
//           resolve(true)
//         }
//       }
//     })
//   })
// }

// function checkResponse(){
//   Plant.find({},function(err,plants){
//     for (var i=0;i<plants.length;i++){
//       var plant = plants[i]
//       if (plant.tweets.length == 0){
//         console.log("no tweets");
//         continue;
//       }
//       var tweets = plant.tweets.sort(function(b,a){return a.createdAt - b.createdAt});
//       var lastTweet = tweets[0];
//       searchReplies(lastTweet).then(function(response){
//         console.log("here is the response")
//         console.log(response)
//       })
//       if (lastTweet){
//         Bot.get('search/tweets',
//         {q:"@Your_Plants",in_reply_to_status_id:lastTweet.tweetID},
//         function(err, data, response) {
//           if (data.statuses.length > 0){
//             var text = data.statuses[0].text;
//             console.log(text)
//             var tweetUserId = data.statuses[0].user.id_str;
//             if (text.indexOf("💧") > -1 && tweetUserId == lastTweet.recipientID){
//               console.log("thank you! resetting your interval")
//               lastTweet.response = true;
//               plant.save(function(err){
//                 if (err){console.log(err)}
//               })
//             }
//           }else{
//             console.log("no responses yet")
//           }
//         })
//       }
//     }
//     })
//   })
// }

// remind();
// checkResponse();

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
