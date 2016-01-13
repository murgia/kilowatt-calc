"use strict";

(function(){
  angular
  .module("appliances")
  .factory("ElectcalcFactory", [
    "$resource",
    ElectcalcFactoryFunction
  ]);

  function ElectcalcFactoryFunction($resource){
    return $resource("http://localhost:3000/electcalcs", {}, {
      update: {method: "PUT"}
    });
  }
}());
