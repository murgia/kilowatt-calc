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
        url: "http://kilowatt-calc.herokuapp.com/electcalcs",
        data: {elect_data: elect_data},
        dataType: "json"
      }).then(function(res){

        // Insert recent Electcalc ID into DOM so it can be accessed by create estimates function
        $(".electcalc-id").text(res.id);
        $(".create-electcalc-heading").append("<p>Your Electrical Profile has been created! Please proceed to the calculator.</p>");
      });
    };

// loop through appliances and create array of estimates (appliance + quantity)
    this.createEstimates = function(){
      var estimates = [];
      for(var i = 1; i <= this.appliances.length; i++){
        if($("#quantity" + i).val() > 0){
          estimates.push({appliance_id: i, quantity: $("#quantity" + i).val()
          });
        }
      }

// ajax post request to post estimates in API
      var electcalc_id = $(".electcalc-id").text();
      var url = "http://kilowatt-calc.herokuapp.com/electcalcs/" + electcalc_id;
      $.ajax({
        method:"post",
        url: url,
        data: {estimates: estimates},
        dataType: "json"
      }).then(function(){
        $(".create-estimate-alert").append("<p>Your electrical calculation is ready to be viewed. Please proceed to the next page!</p>");
      });
    };

// ajax request to EIA to get average price of electricity
    this.getStateElecPrice = function(){
      var state = $(".state-input").val();
      $.get("http://api.eia.gov/series/?api_key=48A9046E879936B4E85D0D8E88AD81BE&series_id=ELEC.PRICE." + state + "-RES.A").then(function(res){
        console.log(res.series[0].data[0][1]);
        var price_in_dollars = (res.series[0].data[0][1]/100);
        $(".elec-price").text(price_in_dollars);
      });
    };
  }
}());
