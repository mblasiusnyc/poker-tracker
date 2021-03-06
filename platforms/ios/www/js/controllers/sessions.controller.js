'use strict';

angular.module('pokerTrackerApp')
  .controller('SessionsCtrl', function ($scope, $http) {

    $scope.sessions = [];

    $http.get('https://poker-tracker-server.herokuapp.com/api/cashGames').success(function(cashGames) {
      cashGames.forEach(function(cashGame) {
      	$scope.sessions.push(cashGame);
      });
      // TODO: Figure out socketio integration
      // socket.syncUpdates('thing', $scope.awesomeThings);
    });

  });
