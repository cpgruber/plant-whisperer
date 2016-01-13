"use strict";

(function(){
  angular
  .module("plants")
  .controller("PlantIndexController", [
    "PlantFactory",
    PlantIndexControllerFunction
  ]);

  function PlantIndexControllerFunction(PlantFactory){
    this.plants = PlantFactory.query(function(plants){
      console.log("this is in factory query")
      console.log(plants.length)
      for (var i=0;i<plants.length;i++){
        plants[i].last_water = new Date(plants[i].last_water);
        plants[i].next_water = new Date(plants[i].next_water)
      }
    });
    this.newPlant = new PlantFactory();
  }
}());
