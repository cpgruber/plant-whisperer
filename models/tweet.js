require("../db/schema");
var mongoose = require("mongoose");

var TweetModel = mongoose.model("Tweet");
module.exports = TweetModel;
