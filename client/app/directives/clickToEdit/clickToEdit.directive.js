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
      controller: function($scope, DropdownOptions) {
      	if($scope.dropdownOptions) {
      		$scope.options = DropdownOptions[$scope.dropdownOptions];
      	}

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

        // $scope.preventSave = function($event) {
        // 	$event.stopPropagation();
        // }

        $scope.save = function() {
        	if($scope.view.editorEnabled) {
	          $scope.value = $scope.view.editableValue;
        		if($scope.value2) $scope.value2 = $scope.view.editableValue2;
	          $scope.disableEditor();
	          console.log("$scope.value: ",$scope.value)
	          console.log("$scope.value2: ",$scope.value2)
        	}
        };
      }
    };
  });