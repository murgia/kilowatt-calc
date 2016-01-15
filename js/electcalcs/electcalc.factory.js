"use strict";

(function(){
  angular
  .module("electcalcs")
  .factory("ElectcalcFactory", [
    "$resource",
    ElectcalcFactoryFunction
  ]);

  function ElectcalcFactoryFunction($resource){
    return $resource("http://kilowatt-calc.herokuapp.com/electcalcs", {}, {
      update: {method: "PUT"}
    });
  }
}());
