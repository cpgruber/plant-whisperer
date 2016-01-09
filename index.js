var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var hbs = require("hbs");
var passport = require("passport");
var session = require("express-session");
var router = require("./config/routes");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set("views","./views");

app.use(router)

app.listen(3000, function(){
  console.log('listening on *:3000');
});
