"use strict";

(function(){
  angular
  .module("appliances", [
    "ngResource"
  ]).controller('getElecPriceController', function($scope, $http){
    var state = $(".state-input").val();
    $http.get("http://api.eia.gov/series/?api_key=48A9046E879936B4E85D0D8E88AD81BE&series_id=ELEC.PRICE." + state + "-RES.A").then(function(res){
      console.log(res.data.series[0].data[0][1]);
      $(".elec-price").text(res.data.series[0].data[0][1]);
      $scope.price = res.data.series[0].data[0][1];
    });
  });
}());
