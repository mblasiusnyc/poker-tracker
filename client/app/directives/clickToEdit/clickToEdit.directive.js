'use strict';

angular.module('pokerTrackerApp')
  .directive('clickToEdit', function () {
    return {
      templateUrl: 'app/directives/clickToEdit/clickToEdit.html',
      restrict: 'A',
      replace: true,
      scope: {
      	value: '=clickToEdit'
      },
      link: function (scope, element, attrs) {
      	console.log('clickToEdit was called')
      	console.log(scope)
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
          $scope.value = $scope.view.editableValue;
          $scope.disableEditor();
        };
      }
    };
  });