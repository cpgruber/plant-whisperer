var express = require('express');
var usersController = require('../controllers/usersController');
var router = express.Router();

router.route('/login')
  .get(usersController.login)

router.route('/logout')
  .get(usersController.logout)

router.route("/")
  .get(function(req,res){
    console.log("req");
    res.send("Hello world")
  })

module.exports = router;
