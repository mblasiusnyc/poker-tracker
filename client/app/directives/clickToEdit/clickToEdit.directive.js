'use strict';

angular.module('pokerTrackerApp')
  .directive('clickToEdit', function () {

    return {
      template: '<div ng-include="templateUrl"></div>',
      restrict: 'A',
      replace: true,
      scope: {
      	name: '=statName',
      	value: '=statValue',
      	value2: '=statValue2',
      	dropdownOptions: '=dropdownOptions'
      },
      link: function (scope, element, attrs) {
      		scope.templateUrl = 'app/directives/clickToEdit/clickToEdit.' + attrs.fieldType + '.html';
      },
      controller: function($scope, DropdownOptions, $timeout, $http) {
      	if($scope.dropdownOptions) {
      		$scope.options = DropdownOptions[$scope.dropdownOptions];
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

        	}
        };
      }
    };
  });