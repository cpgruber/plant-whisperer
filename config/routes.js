var express = require('express');
var usersController = require('../controllers/usersController');
var passport = require('passport');
var router = express.Router();

router.route('/login')
  .get(usersController.login)

router.route('/logout')
  .get(usersController.logout)

router.route('/')
  .get(function(req,res){
    res.redirect('/index')
  })

router.route('/index')
  .get(usersController.index)

router.route('/auth/twitter')
  .get(passport.authenticate('twitter'))

router.route('/auth/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/index',
    failureRedirect: '/login'
  }));

module.exports = router;
