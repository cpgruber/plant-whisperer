"use strict";

(function(){
  angular
  .module("plants")
  .directive("plantForm", [
    "PlantFactory",
    "$state",
    PlantFormDirectiveFunction
  ]);

  function PlantFormDirectiveFunction(PlantFactory, $state){
    return{
      templateUrl: "js/plants/form.html",
      scope: {
        plant: "="
      },
      link: function(scope,elm, attrs, ctrl){
        scope.create = function(){
          scope.plant.$save(function(response){
            $state.go("plantsIndex", {}, {reload: true});
          });
        }
        scope.update = function(){
          scope.plant.$update({id: scope.plant._id}, function(response){
            console.log(response);
            $state.go("plantsIndex", {}, {reload: true});
          });
        }
        scope.delete = function(){
          scope.plant.$delete({id: scope.plant._id}, function(){
            $state.go("plantsIndex", {}, {reload: true});
          });
        },
        scope.cancel = function(){
          $state.go("plantsIndex", {}, {reload: true});
        }
      }
    }
  }
}());
