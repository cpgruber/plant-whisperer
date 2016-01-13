var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost/plant-whisperer");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var PlantSchema = new Schema({
  createdAt: Date,
  type: String,
  frequency: Number,
  interval:String,
  last_water: String,
  next_water: String,
  outdoors: Boolean,
  owner: String,
  zipcode:Number
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
