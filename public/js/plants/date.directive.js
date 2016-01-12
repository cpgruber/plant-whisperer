"use strict";

(function(){
  angular
  .module("plants")
  .directive("dateInput", [
    DateInputDirectiveFunction
  ]);

  function DateInputDirectiveFunction(){
    return {
      templateUrl: "js/plants/dateInput.html",
      scope:{
        plant: "@"
      },
      link: function(scope){
        scope.formatDate= function(date){
          return new Date(date)
        }
      }
    }
  }

}())
