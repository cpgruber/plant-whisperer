"use strict";

(function(){
  angular
  .module("plants")
  .controller("PlantIndexController", [
    "PlantFactory",
    PlantIndexControllerFunction
  ]);

  function PlantIndexControllerFunction(PlantFactory){
    this.plants = PlantFactory.query();
    this.newPlant = new PlantFactory();
  }
}());
