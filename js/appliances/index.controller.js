"use strict";

(function(){
  angular
  .module("appliances")
  .controller("ApplianceIndexController", [
    "ApplianceFactory",
    "$scope",
    "$http",
    ApplianceIndexControllerFunction
  ]);

  function ApplianceIndexControllerFunction(ApplianceFactory){
    this.appliances = ApplianceFactory.query();


// loop through appliances and create array of appliances and quantity
    this.createEstimates = function(){
      console.log("create all estimates");
      var estimates = [];

      for(var i = 1; i <= this.appliances.length; i++){
        if($("#quantity" + i).val() > 0){
          estimates.push({appliance_id: i, quantity: $("#quantity" + i).val()
          });
        }
      }
// ajax post request to to create estimates in API
      console.log("ajax request initiated");
      $.ajax({
        method:"post",
        url: "http://localhost:3000/electcalcs/1" ,
        data: {estimates: estimates},
        dataType: "json"
      }).then(function(res){
        console.log(res);
      }).fail(function(res){
        console.log(estimates)
      });
    };

    this.getStateElecPrice = function($scope, $http){

      console.log("testing click event")
      var state = $(".state-input").val();
      $http({
          method: "GET",
          url: "/http://api.eia.gov/series/?api_key=48A9046E879936B4E85D0D8E88AD81BE&series_id=ELEC.PRICE." + state + "-RES.A"
      }).then(function(res){
        console.log(res);
      });
    };

  }
}());
