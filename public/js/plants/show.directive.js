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
      template:"<p>{{plant.type}}</p>",
      replace: true,
      restrict:"A",
      scope:{
        plant: "="
      },
      link: function(scope,el){
        console.log(scope)
        // scope.plant = PlantFactory.get({id: scope.plant._id});
        // scope.plant = "CHASASAS"
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
