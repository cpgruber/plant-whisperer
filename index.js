var express = require("express");
var env = require("./env");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var hbs = require("hbs");
var passport = require("passport");
var session = require("express-session");
var router = require("./config/routes");

require('./config/passport')(passport);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: env.sessionSecret }));
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'hbs');
app.set("views","./views");

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// working middleware for routes starting with /profile
app.all('/users*', checkUser);
function checkUser(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}
app.use(router)

app.listen(3000, function(){
  console.log('listening on *:3000');
});
