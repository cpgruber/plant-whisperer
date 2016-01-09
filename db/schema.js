var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/plant-whisperer");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var PlantSchema = new Schema({
  createdAt: Date,
  type: String,
  frequency: Number,
  last_water: Date,
  next_water: Date
});

var UserSchema = new Schema({
  local : {
    email: String,
    password: String,
  },
  twitter : {
    id: String,
    token: String,
    username: String,
    displayName: String
  },
  plants : []
});

mongoose.model("User", UserSchema);
mongoose.model("Plant", PlantSchema);
