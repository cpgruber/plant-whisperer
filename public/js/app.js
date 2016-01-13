"use strict";

(function(){
  angular
  .module("plantwhisperer", [
    "ui.router",
    "plants"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("plantsIndex", {
      url: "/plants",
      templateUrl: "js/plants/index.html",
      controller: "PlantIndexController",
      controllerAs: "PlantIndexViewModel"
    })
    // .state("plantShow", {
    //   url: "/plants/:id",
    //   templateUrl: "js/plants/show.html",
    //   controller: "PlantShowController",
    //   controllerAs: "PlantShowViewModel"
    // });
  }
}());
