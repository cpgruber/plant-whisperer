var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/plant-whisperer");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

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
  }
});

mongoose.model("User", UserSchema);
