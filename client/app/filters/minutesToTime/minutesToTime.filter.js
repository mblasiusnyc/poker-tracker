'use strict';

angular.module('pokerTrackerApp')
  .filter('minutesToTime', function () {
    return function (input) {
    	console.log("input: ", input)
      var hours = Math.floor(input/60);
      var minutes = Math.floor(input % 60);
      if(minutes.toString().length === 1) {
      	minutes = '0'+minutes;
      }
      return hours+':'+minutes
    };
  });
