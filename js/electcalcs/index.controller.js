"use strict";

(function(){
  angular
  .module("electcalcs")
  .controller("ElectcalcIndexController", [
    "ElectcalcFactory",
    ElectcalcIndexControllerFunction
  ]);

  function ElectcalcIndexControllerFunction(ElectcalcFactory){
    this.electcalcs = ElectcalcFactory.query();
  }
}());
