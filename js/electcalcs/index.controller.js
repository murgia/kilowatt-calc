"use strict";

(function(){
  angular
  .module("electcalcs")
  .controller("ElectcalcsIndexController", [
    "ElectcalcFactory",
    ElectcalcIndexControllerFunction
  ]);

  function ElectcalcIndexControllerFunction(ElectcalcFactory){
    this.electcalcs = ElectcalcFactory.query();
  }
}());
