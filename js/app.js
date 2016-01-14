"use strict";

(function(){
  angular
  .module("kilowattcalc", [
    "ui.router",
    "appliances",
    "electcalcs"
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
    })
    .state("electcalcIndex", {
      url: "/electcalcs",
      templateUrl: "js/electcalcs/index.html",
      controller: "ElectcalcIndexController",
      controllerAs: "ElectcalcIndexViewModel"
    });
  }

})();
