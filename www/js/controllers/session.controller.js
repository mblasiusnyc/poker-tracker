'use strict';

angular.module('pokerTrackerApp')
  .controller('SessionCtrl', function ($stateParams, $scope, $http, serverConfig) {

  	$http.get(serverConfig.address + 'api/cashGames/'+$stateParams.sessionId).success(function(session) {
  	  $scope.session = session;
  	});

  	$scope.deleteSession = function(){
	  	$http.delete(serverConfig.address + 'api/cashGames/'+$stateParams.sessionId).success(function(Err, Status) {
  			console.log('Session Deleted');
  		});
  	}

  	$scope.endSession = function(){
  		var endDate = moment(new Date(Date.now()));
  		$scope.session.endTime = endDate.toISOString();
	  	$http.put(serverConfig.address + 'api/cashGames/'+$stateParams.sessionId, $scope.session).success(function(cashGame, Status) {
  			console.log('Session Updated');
  			$scope.$broadcast('sessionUpdated');
  		});
  	}

  });