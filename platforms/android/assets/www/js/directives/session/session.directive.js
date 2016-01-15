'use strict';

angular.module('pokerTrackerApp')
  .directive('session', function () {
    return {
      templateUrl: 'js/directives/session/session.html',
      restrict: 'EA',
      scope: {
      	item: '='
      },
      link: function (scope, element, attrs) {
      	function createInfoString() {
      		var arr = [];
      		var session = {};
      		var propsToDisplay = ['smallBlind', 'bigBlind', 'gameType', 'tableSize', 'location'];
      		for(var key in scope.item){
      			if(propsToDisplay.indexOf(key)+1){
	    				session[key] = scope.item[key];
      			}
      		};
      		if(session.smallBlind && session.bigBlind) arr.push('$'+session.smallBlind+'/'+session.bigBlind);
      		if(session.gameType) arr.push(session.gameType);
      		if(session.tableSize) arr.push(session.tableSize);
      		if(session.location) arr.push(session.location);
      		scope.sessionInfoString = arr.join(' - ')
      	}
      	createInfoString();

      	function createResultString() {
      		scope.resultString = '';
      		if(scope.item.result >= 0) {
      			scope.resultString = '$'+scope.item.result.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      		} else {
      			scope.resultString = '-$'+Math.abs(scope.item.result).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      		}
      	}
      	createResultString();
      }
    };
  });