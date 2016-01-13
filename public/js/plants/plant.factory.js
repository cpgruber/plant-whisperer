"use strict";

(function(){
  angular
  .module("plants")
  .factory("PlantFactory", [
    "$resource",
    PlantFactoryFunction
  ]);

  function PlantFactoryFunction($resource){
    var baseURL = window.location.href;
    console.log(baseURL)
    return $resource(baseURL+"plants/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
