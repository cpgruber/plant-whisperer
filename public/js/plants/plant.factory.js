"use strict";

(function(){
  angular
  .module("plants")
  .factory("PlantFactory", [
    "$resource",
    PlantFactoryFunction
  ]);

  function PlantFactoryFunction($resource){
    return $resource("http://127.0.0.1:3000/plants/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
