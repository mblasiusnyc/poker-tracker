'use strict';

angular.module('pokerTrackerApp')
  .directive('session', function () {
    return {
      templateUrl: 'app/directives/session/session.html',
      restrict: 'EA',
      scope: {
      	item: '='
      },
      link: function (scope, element, attrs) {
      	function createString() {
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
      	createString();
      }
    };
  });