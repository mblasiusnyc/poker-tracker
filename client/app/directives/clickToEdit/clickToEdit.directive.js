'use strict';

angular.module('pokerTrackerApp')
  .directive('clickToEdit', function () {
    return {
      template: '<div ng-include="templateUrl"></div>',
      restrict: 'A',
      replace: true,
      scope: {
      	fieldType: '=fieldType',
      	name: '=statName',
      	key: '=statKey',
      	key2: '=statKey2',
      	value: '=statValue',
      	value2: '=statValue2',
      	dropdownOptions: '=dropdownOptions'
      },
      link: function (scope, element, attrs) {
      		scope.templateUrl = 'app/directives/clickToEdit/clickToEdit.' + scope.fieldType + '.html';
      },
      controller: function($scope, DropdownOptions, $timeout, $http, $stateParams, moment) {
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

        function setLengthMinutes() {
          $timeout(function(){
          	var endTime = moment($scope.$parent.session.endTime);
          	var startTime = moment($scope.$parent.session.startTime);
          	var currentTime = moment();
          	if(moment(endTime).isValid()) {
		          $scope.$parent.session.lengthMinutes = (endTime.diff(startTime))/(1000*60);
	          } else {
	          	$scope.$parent.session.lengthMinutes = (currentTime.diff(startTime))/(1000*60);
	          }
          },0);
        }

        $scope.save = function() {
        	if($scope.view.editorEnabled) {
	          $scope.value = $scope.view.editableValue;
        		if($scope.value2) $scope.value2 = $scope.view.editableValue2;
	          $scope.disableEditor();
          	if($scope.fieldType === 'date' && moment($scope.value).isValid()) {
          		setLengthMinutes();
          	} else if($scope.fieldType === 'date') {
          		return;
          	}
	          var newSession = {};
	          newSession[$scope.key] = $scope.value;
	          if($scope.value2) newSession[$scope.key2] = $scope.value2;
      	  	$http.put('/api/cashGames/'+$stateParams.sessionId, newSession).success(function(cashGame, Status) {
        			console.log( Status === 200 ? "Session has been saved" : "There was an error saving the session");
        		});
        	}
        };

      }
    };
  });