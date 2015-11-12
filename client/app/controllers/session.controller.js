'use strict';

angular.module('pokerTrackerApp')
  .controller('SessionCtrl', function ($stateParams, $scope, $http) {

  	$http.get('/api/cashGames/'+$stateParams.sessionId).success(function(session) {
  	  $scope.session = session;
  	});

  	$scope.deleteSession = function(){
	  	$http.delete('/api/cashGames/'+$stateParams.sessionId).success(function(Err, Status) {
  			console.log('Session Deleted');
  		});
  	}

  	$scope.endSession = function(){
  		var endDate = new Date(Date.now());
  		$scope.session.endTime = endDate.toISOString();
	  	$http.put('/api/cashGames/'+$stateParams.sessionId, $scope.session).success(function(cashGame, Status) {
  			console.log('Session Updated');
  		});
  	}

  });