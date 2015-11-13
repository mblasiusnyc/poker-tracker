'use strict';

angular.module('pokerTrackerApp')
  .controller('CashGameCtrl', function ($scope, $http, DropdownOptions) {

  	$scope.data = {
    	gameOptions: DropdownOptions.gameType,
    	locationOptions: DropdownOptions.location,
    	bankrollOptions: DropdownOptions.bankroll,
    	tableSizeOptions: DropdownOptions.tableSize
  	}

  	//Default Dropdown Values
  	$scope.newCashGameData = {
    	bankroll: 'Live Bankroll'
  	}

    $scope.createGame = function() {
      $http.post('/api/cashGames', $scope.newCashGameData);
    };

  });
