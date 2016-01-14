"use strict";

(function(){
  angular
  .module("appliances")
  .controller("ApplianceIndexController", [
    "ApplianceFactory",
    ApplianceIndexControllerFunction
  ]);

  function ApplianceIndexControllerFunction(ApplianceFactory, ElectcalcFactory){
    this.appliances = ApplianceFactory.query();

// ajax post request to create electcalc
    this.createElectcalc = function(){
      var elect_data = {name: $(".name-input").val(), state: $(".state-input").val(), avg_cost: $(".elec-price").text() };
      console.log(elect_data);
      $.ajax({
        method: "post",
        url: "http://localhost:3000/electcalcs",
        data: {elect_data: elect_data},
        dataType: "json"
      }).then(function(res){

        // Insert recent Electcalc ID into DOM to be access by create estimates
        $(".electcalc-id").text(res.id);
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
      var electcalc_id = $(".electcalc-id").text();
      var url = "http://localhost:3000/electcalcs/" + electcalc_id;
      $.ajax({
        method:"post",
        url: url,
        data: {estimates: estimates},
        dataType: "json"
      }).then(function(res){
        console.log(res);
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
