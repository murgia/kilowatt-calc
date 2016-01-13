"use strict";

(function(){
  angular
  .module("appliances")
  .factory("ApplianceFactory", [
    "$resource",
    ApplianceFactoryFunction
  ]);

  function ApplianceFactoryFunction($resource){
    return $resource("http://localhost:3000/appliances", {}, {
      update: {method: "PUT"}
    });
  }
}());
