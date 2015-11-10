'use strict';

angular.module('pokerTrackerApp')
  .controller('CashGameCtrl', function ($scope) {
  	$scope.data = {
    	gameOptions: ['Hold Em', 'Pot Limit Omaha', 'Omaha Hi/Lo', 'Razz'],
    	locationOptions: ['Ameristar', 'Mirage', 'Home Game'],
    	bankrollOptions: ['Live Bankroll', 'Other Bankroll'],
    	tableSizeOptions: [
    		{ name: 'Heads Up', value: 2 },
    		{ name: '3 max', value: 3 },
    		{ name: '4 max', value: 4 },
    		{ name: '5 max', value: 5 },
    		{ name: '6 max', value: 6 },
    		{ name: '7 max', value: 7 },
    		{ name: '8 max', value: 8 },
    		{ name: '9 max', value: 9 },
    		{ name: '10 max', value: 10 }
    	]
  	}
    $scope.selectedBankroll = 'Live Bankroll';
  });
