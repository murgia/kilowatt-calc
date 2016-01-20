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

// loop through appliances and create array of estimates (appliance + quantity)
    this.createElectricalCalculation = function(){
      // loop through appliances to create estimates associated with correct quantity
      var estimates = [];
      var get_estimates = function(){
        for(var i = 1; i <= this.appliances.length; i++){
          if($("#quantity" + i).val() > 0){
            estimates.push({appliance_id: i, quantity: $("#quantity" + i).val()
            });
          }
        }
      }.bind(this);

      // get the id of the created electrical calculation
      // var electcalc_id = $(".electcalc-id").text();

      // get electrical data information
      var elect_data = {name: $(".name-input").val(), state: $(".state-input").val(), avg_cost: $(".elec-price").text() };


      // ajax post request to post estimates in API
      var create_estimates = function(id){
                                $.ajax({
                                method:"post",
                                url: "http://kilowatt-calc.herokuapp.com/electcalcs/" + id,
                                data: {estimates: estimates},
                                dataType: "json"
                              }).then(function(){
                                $(".create-estimate-alert").append("<p>Your electrical calculation is ready to be viewed. Please proceed to the next page!</p>");
                              });
                            };
      // ajax post request to create electcalc
      $.ajax({
        method: "post",
        url: "http://kilowatt-calc.herokuapp.com/electcalcs",
        data: {elect_data: elect_data},
        dataType: "json"
      }).then(function(res){
        get_estimates();
        return res;
      }).then(function(res){
      //ajax post request to create estimates
        create_estimates(res.id);
      }).then(function(){
        window.location.href = "http://murgia.github.io/kilowatt-calc/#/electcalcs";
      });
    };

// ajax request to EIA to get average price of electricity
    this.getStateElecPrice = function(){
      var state = $(".state-input").val();
      $.get("http://api.eia.gov/series/?api_key=48A9046E879936B4E85D0D8E88AD81BE&series_id=ELEC.PRICE." + state + "-RES.A").then(function(res){
        var price_in_dollars = (res.series[0].data[0][1]/100).toFixed(2);
        $(".elec-price").text(price_in_dollars);
      });
    };
  }
}());
