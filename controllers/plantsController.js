var User = require("../models/user");
var Plant = require("../models/plant");

var plantsController = {
  getPlants: function(req,res){
    User.findById(req.user._id, function(err, user){
      var userPlants = user.plants
      Plant.find({'_id': {$in: userPlants}}).then(function(plants){
        res.json(plants);
      });
    })
  },
  getPlant: function(req,res){
    Plant.findById(req.params.id, function(err, plant){
      if (!err){
        res.json(plant)
      }
    })
  },
  addPlant: function(req,res){
    User.findById(req.user._id, function(err,user){
      var plantObj = {
        createdAt: Date(),
        type:req.body.type,
        frequency: req.body.freq,
        last_water: req.body.last_water,
        next_water: Date()
      }
      var newPlant = new Plant(plantObj);
      user.plants.push(newPlant._id);
      user.save();
      newPlant.save(function(err){
        if (!err){
          res.redirect("/plants.json")
        }else{
          console.log(err)
        }
      })
    })
  },
  updatePlant: function(req,res){
    Plant.findById(req.params.id, function(err, plant){
      plant.type = req.body.type;
      plant.frequency = req.body.freq;
      plant.last_water = req.body.last_water;
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
         res.redirect("/users")
       }
     })
  }
}

module.exports = plantsController;
