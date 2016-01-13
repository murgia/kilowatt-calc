"use strict";

(function(){
  angular
  .module("appliances")
  .controller("ApplianceIndexController", [
    "ApplianceFactory",
    "ElectcalcFactory",
    ApplianceIndexControllerFunction
  ]);

  function ApplianceIndexControllerFunction(ApplianceFactory, ElectcalcFactory){
    this.appliances = ApplianceFactory.query();
    this.electcalcs = ElectcalcFactory.query();

// ajax post request to create electcalc
    this.createElectcalc = function(){
      console.log("click test");
      var elect_data = {name: $(".name-input").val(), state: $(".state-input").val(), avg_cost: $(".elec-price").text() };
      console.log(elect_data);
      $.ajax({
        method: "post",
        url: "http://localhost:3000/electcalcs",
        data: elect_data,
        dataType: "json"
      }).then(function(res){
        console.log(res);
      }).fail(function(res){
        console.log(elect_data);
      });
    };

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
// ajax request to EIA to get average price of electricity
    this.getStateElecPrice = function(){
      var state = $(".state-input").val();
      $.get("http://api.eia.gov/series/?api_key=48A9046E879936B4E85D0D8E88AD81BE&series_id=ELEC.PRICE." + state + "-RES.A").then(function(res){
        console.log(res.series[0].data[0][1]);
        $(".elec-price").text(res.series[0].data[0][1]);
      });
    };
  }
}());
