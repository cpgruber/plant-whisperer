var express = require('express');
var router = express.Router();

router.route("/")
  .get(function(req,res){
    console.log("req");
    res.send("Hello world")
  })

module.exports = router;
