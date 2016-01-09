require("../db/schema");
var mongoose = require("mongoose");

var PlantModel = mongoose.model("Plant");
module.exports = PlantModel;
