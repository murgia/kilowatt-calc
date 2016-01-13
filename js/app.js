"use strict";

(function(){
  angular
  .module("kilowattcalc", [
    "ui.router",
    "appliances"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("applianceIndex", {
      url: "/appliances",
      templateUrl: "js/appliances/index.html",
      controller: "ApplianceIndexController",
      controllerAs: "ApplianceIndexViewModel"
    });
  }

})();
