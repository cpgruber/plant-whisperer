var User = require("../models/user");
var Plant = require("../models/plant");
var moment = require("moment");

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
        frequency: req.body.frequency,
        interval: req.body.interval,
        last_water: moment(req.body.last_water),
        next_water: moment(req.body.last_water).add(req.body.frequency,'minutes'),
        outdoors: req.body.outdoors?req.body.outdoors:false,
        owner: req.user.twitter.username,
        zipcode: req.body.zipcode
      }
      var newPlant = new Plant(plantObj);
      user.plants.push(newPlant._id);
      user.save();
      newPlant.save(function(err){
        if (!err){
          res.json(newPlant)
        }else{
          console.log(err)
        }
      })
    })
  },
  updatePlant: function(req,res){
    Plant.findById(req.params.id, function(err, plant){
      plant.type = req.body.type;
      plant.frequency = req.body.frequency;
      plant.interval = req.body.interval;
      plant.last_water = req.body.last_water;
      plant.next_water= moment(req.body.last_water).add(req.body.frequency, 'days');
      plant.outdoors= req.body.outdoors?req.body.outdoors:false;
      plant.zipcode = req.body.zipcode;
      plant.save(function(err){
        if(!err){
          res.json(plant)
        }
      })
    })
  },
  deletePlant: function(req,res){
    Plant.remove({_id: req.params.id}, function(err){
      if(!err){
        User.findById(req.user._id, function(err,user){
          if(!err){
            var index = user.plants.indexOf(req.params.id)
            user.plants.splice(index,1)
            user.save(function(err){
              if(!err){
                console.log("index of deleted plant is " +index)
                res.json({deleted:true})
              }
            })
          }
        })
      }
    })
  }
}

module.exports = plantsController;
