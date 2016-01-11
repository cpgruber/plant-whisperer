"use strict";

(function(){
  angular
  .module("plants")
  .controller("PlantShowController", [
    "PlantFactory",
    "$stateParams",
    PlantShowControllerFunction
  ]);

  function PlantShowControllerFunction(PlantFactory, $stateParams){
    this.plant = PlantFactory.get({id: $stateParams.id});
  }
}());
