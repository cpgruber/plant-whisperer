// "use strict";
//
// (function(){
//   angular
//   .module("plants")
//   .controller("PlantShowController", [
//     "PlantFactory",
//     "$stateParams",
//     PlantShowControllerFunction
//   ]);
//
//   function PlantShowControllerFunction(PlantFactory, $stateParams){
//     this.plant = PlantFactory.get({id: $stateParams.id}, function(plant){
//       plant.last_water = new Date(plant.last_water)
//       plant.next_water = new Date(plant.next_water)
//     });
//     // this.populatePlant = function(plant){
//     //   $scope.newPlant = plant;
//     // }
//   }
// }());
