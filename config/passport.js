var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("../env") : process.env;
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user');

module.exports = function(passport){
  passport.use(new TwitterStrategy({
    consumerKey: env.consumerKey,
    consumerSecret: env.consumerSecret,
    callbackURL: env.callback
  }, function(token, secret, profile, done){
    process.nextTick(function(){
      User.findOne({'twitter.id': profile.id}, function(err, user){
        if(err) return done(err);
        // If the user already exists, just return that user.
        if(user){
          user.twitter.token = token;
          user.twitter.displayName = profile.displayName;
          user.save(function(err){
            if (err) throw err;
            return done(null, user);
          })
        } else {
          // Otherwise, create a brand new user using information passed from GH.
          var newUser = new User();
          // Here we're saving information passed to us from GH.
          newUser.twitter.id = profile.id;
          newUser.twitter.token = token;
          newUser.twitter.username = profile.username;
          newUser.twitter.displayName = profile.displayName;
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          })
        }
      })
    })
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
}
