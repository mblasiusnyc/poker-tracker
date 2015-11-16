'use strict';

angular.module('pokerTrackerApp')
  .directive('clickToEdit', function () {
    return {
      template: '<div ng-include="templateUrl"></div>',
      restrict: 'A',
      replace: true,
      scope: {
      	name: '=statName',
      	key: '=statKey',
      	key2: '=statKey2',
      	value: '=statValue',
      	value2: '=statValue2',
      	dropdownOptions: '=dropdownOptions'
      },
      link: function (scope, element, attrs) {
      		scope.templateUrl = 'app/directives/clickToEdit/clickToEdit.' + attrs.fieldType + '.html';
      },
      controller: function($scope, DropdownOptions, $timeout, $http, $stateParams) {
      	if($scope.dropdownOptions) {
      		$scope.options = DropdownOptions[$scope.dropdownOptions];
      	}

      	if($scope.key === 'startTime' || $scope.key === 'endTime') {
	      	$timeout(function(){
		      	$scope.value = new Date($scope.value);
		      	$scope.value.setSeconds(0);
		      	$scope.value.setMilliseconds(0);
	      	},0);
      	}

      	$scope.focus = {
      		1: false,
      		2: false
      	}

				$scope.$watchCollection('focus', function(newValues, oldValues, scope) {
					$timeout(function(){
						if(newValues[1] == false && newValues[2] == false) {
							$scope.save();
						}
					},0)
				});

        $scope.view = {
          editableValue: $scope.value,
          editableValue2: $scope.value2 ? $scope.value2 : undefined,
          editorEnabled: false
        };

        $scope.enableEditor = function() {
	          $scope.view.editorEnabled = true;
	          $scope.view.editableValue = $scope.value;
	          if($scope.value2) $scope.view.editableValue2 = $scope.value2;
        };

        $scope.disableEditor = function() {
          $scope.view.editorEnabled = false;
        };

        $scope.save = function() {
        	if($scope.view.editorEnabled) {
	          $scope.value = $scope.view.editableValue;
        		if($scope.value2) $scope.value2 = $scope.view.editableValue2;
	          $scope.disableEditor();
	          var newSession = {};
	          newSession[$scope.key] = $scope.value;
	          if($scope.value2) newSession[$scope.key2] = $scope.value2;
	          $timeout(function(){
		          if($scope.$parent.session.endTime) {
			          $scope.$parent.session.lengthMinutes = ($scope.$parent.session.endTime-$scope.$parent.session.startTime)/(1000*60)
		          } else {
		          	$scope.$parent.session.lengthMinutes = (Date.now()-$scope.$parent.session.startTime)/(1000*60)
		          }
	          },0)
      	  	$http.put('/api/cashGames/'+$stateParams.sessionId, newSession).success(function(cashGame, Status) {
        			console.log( Status === 200 ? "Session has been saved" : "There was an error saving the session");
        		});
        	}
        };

      }
    };
  });