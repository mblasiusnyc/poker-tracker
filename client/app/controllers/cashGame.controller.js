'use strict';

angular.module('pokerTrackerApp')
  .controller('CashGameCtrl', function ($scope, $http) {



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

  	//Default Dropdown Values
  	$scope.newCashGameData = {
    	bankroll: 'Live Bankroll'
  	}


    $scope.createGame = function() {
    	console.log("GETS HERE")
      $http.post('/api/cashGames', {
      	location: $scope.newCashGameData.location,
      	gameType: $scope.newCashGameData.gameType,
      	smallBlind: $scope.newCashGameData.smallBlind,
      	bigBlind: $scope.newCashGameData.bigBlind,
      	bankroll: $scope.newCashGameData.bankroll,
      	tableSize: ($scope.newCashGameData.tableSize.value ? $scope.newCashGameData.tableSize.value : '')
      });
    };


  });
