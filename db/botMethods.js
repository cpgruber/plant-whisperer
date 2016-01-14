var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("../env") : process.env;
var Plant = require("../models/plant")
var Tweet = require("../models/tweet")
var Twit = require('twit');
var moment = require("moment");
var Weather = require('wundergroundnode');

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



// var getPlayerLogs = function (games){
//   return new Promise(function(resolve, reject){
//     var callsDone = 0;
//     var logs = [];
//     for (var i = 0; i < games.length; i++) {
//       var url = "https://www.stattleship.com/basketball/nba/game_logs?game_id="+games[i].slug;
//       stattleship_params.url = url;
//       request(stattleship_params,
//         function(err,response,body){
//           if(err){
//             resolve({exists:false})
//             console.log("Invalid query.")
//           }else{
//             logs.push(body);
//             if (++callsDone == games.length){
//               resolve(logs);
//             }
//           }
//         })
//       }
//     })
//   }
