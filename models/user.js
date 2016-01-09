require("../db/schema");
var mongoose = require("mongoose");

var UserModel = mongoose.model("User");
module.exports = UserModel;
