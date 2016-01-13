"use strict";

(function(){
  angular
  .module("plants")
  .controller("PlantIndexController", [
    "PlantFactory","$scope",
    PlantIndexControllerFunction
  ]);

  function PlantIndexControllerFunction(PlantFactory,$scope){
    this.plants = PlantFactory.query(function(plants){
      for (var i=0;i<plants.length;i++){
        plants[i].last_water = new Date(plants[i].last_water);
        plants[i].next_water = new Date(plants[i].next_water)
      }
    });
    this.newPlant = new PlantFactory();
    // this.populate = function(plant){
    //   console.log("index view model")
    //   console.log(plant);
    // }
    // $scope.newPlant = new PlantFactory();
    // console.log($scope)

    // this.populateForm = function(plant){
    //   if (plant){
    //     this.newPlant = plant;
    //   }else{
    //     this.newPlant = new PlantFactory();
    //   }
    //
    // }
  }
}());
