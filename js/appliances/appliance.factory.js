"use strict";

(function(){
  angular
  .module("appliances")
  .factory("ApplianceFactory", [
    "$resource",
    ApplianceFactoryFunction
  ]);

  function ApplianceFactoryFunction($resource){
    return $resource("https://kilowatt-calc.herokuapp.com/appliances", {}, {
      update: {method: "PUT"}
    });
  }
}());
