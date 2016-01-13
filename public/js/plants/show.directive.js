"use strict";

(function(){
  angular
  .module("plants")
  .directive("showDirective",[
    "$state",
    "$stateParams",
    "PlantFactory",
    ShowDirectiveFunction
  ])

  function ShowDirectiveFunction($state,$stateParams,PlantFactory){
    return {
      templateUrl:"js/plants/_plant_show.html",
      replace: true,
      restrict:"A",
      scope:{
        plant: "="
      },
      link: function(scope,el){
        // scope.populateForm = function(){
        //   console.log("from populate form")
          // console.log(scope.plant)
          // $scope.newPlant = scope.plant;
        // }
        // console.log(scope)
        // console.log(el)
        // console.log(el[0].getElementsByTagName("a"));
      }
    }
  }

})()
