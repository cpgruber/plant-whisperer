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
        scope.formShow = false;
        scope.showForm = function(){
          scope.formShow = (scope.formShow)?false:true;
        }
      }
    }
  }

})()
