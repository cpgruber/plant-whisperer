var User = require("../models/user");
var Plant = require("../models/plant");

var plantsController = {
  read:function(req,res){
    console.log(req.user);
    res.json(req.user)
  },
  getPlants: function(req,res){
    Plant.find().then(function(plants){res.json(plants)})
    // User.findById(req.user._id, function(err, user){
    //   var userPlants = user.plants
    //   if (req.params.format){
    //     Plant.find({'_id': {$in: userPlants}}).then(function(plants){
    //       res.json(plants);//response renders json of profiles
    //     });
    //   }else{
    //     Plant.find({'_id': {$in: userPlants}}).then(function(plants){
    //       res.render("index")
    //     });
    //   }
    // })
  },
  addPlant: function(req,res){
    var plantObj = {
      createdAt: Date(),
      type:req.body.type,
      frequency: req.body.freq,
      last_water: Date(),
      next_water: Date()
    }
    var newPlant = new Plant(plantObj);
    console.log(newPlant);
    newPlant.save(function(err){
      if (!err){
        res.json(newPlant)
      }else{
        console.log(err)
      }
    })
    // User.findById(req.user._id, function(err,user){
    //   var plantObj = {
    //     createdAt: Date(),
    //     type: "ficas",
    //     frequency: 1,
    //     last_water: Date(),
    //     next_water: Date()
    //   }
    //   var newPlant = new Plant(plantObj);
    //   console.log(newPlant);
    //   newPlant.save(function(err){
    //     if (!err){
    //       res.json(newPlant)
    //     }else{
    //       console.log(err)
    //     }
    //   })
    // })
  },
  updatePlant: function(req,res){
    Plant.findById(req.params.id, function(err, plant){
      plant.type = req.body.type
      plant.save(function(err){
        if(!err){
          res.json("/plants/" + req.params.id)
        }
      })
    })
  },
  deletePlant: function(req,res){
    Plant.remove({_id: req.params.id}, function(err){
       if(!err){
         res.redirect("/plants")
       }
     })
  }
}

module.exports = plantsController;
