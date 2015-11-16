'use strict';

angular.module('pokerTrackerApp')
  .filter('isInvalidDate', function () {
    return function (input) {
    	// console.log('input: '+typeof(input))
      return moment(input).isValid() ? input : '-';
    };
  });
