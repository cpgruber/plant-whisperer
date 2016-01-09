var express = require('express');
var usersController = require('../controllers/usersController');
var plantsController = require('../controllers/plantsController');
var passport = require('passport');
var router = express.Router();

router.route('/login')
  .get(usersController.login)

router.route('/logout')
  .get(usersController.logout)

router.route('/')
  .get(function(req,res){
    res.redirect('/users')
  })

router.route("/plants.json")
  .get(plantsController.read)

router.route('/users')
  .get(usersController.index)

router.route('/auth/twitter')
  .get(passport.authenticate('twitter'))

router.route('/auth/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/users',
    failureRedirect: '/login'
  }));

module.exports = router;
