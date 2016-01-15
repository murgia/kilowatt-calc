"use strict";

(function(){
  angular
  .module("electcalcs")
  .controller("ElectcalcIndexController", [
    "ElectcalcFactory",
    ElectcalcIndexControllerFunction
  ]);

  function ElectcalcIndexControllerFunction(ElectcalcFactory){
    // function to get all of the electrical calculations
    this.electcalcs = ElectcalcFactory.query();
  }
}());
