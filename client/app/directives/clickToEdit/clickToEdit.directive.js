'use strict';

angular.module('pokerTrackerApp')
  .directive('clickToEdit', function () {

    return {
      template: '<div ng-include="templateUrl"></div>',
      restrict: 'A',
      replace: true,
      scope: {
      	name: '=statName',
      	value: '=statValue'
      },
      link: function (scope, element, attrs) {
      		console.log('clickToEdit loaded')
      		scope.templateUrl = 'app/directives/clickToEdit/clickToEdit.' + attrs.fieldType + '.html';
      },
      controller: function($scope) {

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