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
        scope.showBody = false;
        scope.arrow = '\u2193';
        scope.toggleShow = function(){
          scope.showBody=(scope.showBody)?false:true;
          scope.arrow=(scope.showBody)?"\u2191":"\u2193";
        }
      }
    }
  }

})()
