'use strict';

angular.module('pokerTrackerApp')
  .directive('clickToEdit', function () {
  	var templatePaths = {
  		text: 'app/directives/clickToEdit/clickToEdit.text.html',
  		dropdown: 'app/directives/clickToEdit/clickToEdit.dropdown.html',
  		number: 'app/directives/clickToEdit/clickToEdit.number.html',
  		date: 'app/directives/clickToEdit/clickToEdit.date.html',
  	}

    return {
      template: '<div ng-include="templateUrl"></div>',
      restrict: 'A',
      replace: true,
      scope: {
      	value: '=clickToEdit'
      },
      link: function (scope, element, attrs) {
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
          $scope.value = $scope.view.editableValue;
          $scope.disableEditor();
        };
      }
    };
  });