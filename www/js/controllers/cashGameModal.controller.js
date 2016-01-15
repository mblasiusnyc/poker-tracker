
angular.module('pokerTrackerApp').controller('CashGameCtrl', function ($scope, $uibModal, $log) {

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'templates/cashGame.html',
      controller: 'CashGameInstanceCtrl',
      size: 'sm'
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.


angular.module('pokerTrackerApp').controller('CashGameInstanceCtrl', function ($scope, $uibModalInstance, $http, serverConfig, DropdownOptions, $state) {

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
    $http.post(serverConfig.address + 'api/cashGames', $scope.newCashGameData);
    $state.go($state.current, {}, {reload: true});
    $uibModalInstance.dismiss();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});