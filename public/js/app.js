"use strict";

(function(){
  angular
  .module("plantwhisperer", [
    "ui.router",
    "plants"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("plantsIndex", {
      url: "/plants",
      templateUrl: "js/plants/index.html",
      controller: "PlantIndexController",
      controllerAs: "PlantIndexViewModel"
    })
    .state("plantShow", {
      url: "/plants/:id",
      templateUrl: "js/plants/show.html",
      controller: "PlantShowController",
      controllerAs: "PlantShowViewModel"
    });
  }
}());
