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
      	dropdownOptions: '=dropdownOptions'
      },
      link: function (scope, element, attrs) {
      		scope.templateUrl = 'app/directives/clickToEdit/clickToEdit.' + attrs.fieldType + '.html';
      },
      controller: function($scope, DropdownOptions) {
      	if($scope.dropdownOptions) {
      		$scope.options = DropdownOptions[$scope.dropdownOptions];
      	}

        $scope.view = {
          editableValue: $scope.value,
          editorEnabled: false
        };

        $scope.enableEditor = function() {
	          $scope.view.editorEnabled = true;
	          $scope.view.editableValue = $scope.value;
        };

        $scope.disableEditor = function() {
          $scope.view.editorEnabled = false;
        };

        $scope.save = function() {
        	if($scope.view.editorEnabled) {
	          $scope.value = $scope.view.editableValue;
	          $scope.disableEditor();
	          console.log($scope.value)
        	}
        };
      }
    };
  });