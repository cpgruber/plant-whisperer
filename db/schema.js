var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost/plant-whisperer");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var TweetSchema = new Schema({
  createdAt: Date,
  tweetID: String,
  myID: String,
  recipientID: String
})

var PlantSchema = new Schema({
  createdAt: Date,
  type: String,
  frequency: Number,
  interval:String,
  last_water: Date,
  next_water: Date,
  // outdoors: Boolean,
  owner: String,
  // zipcode:Number,
  tweets:[TweetSchema]
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
mongoose.model("Tweet",TweetSchema);
