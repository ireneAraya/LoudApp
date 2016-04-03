angular.module ('loudApp.controllers')

.controller('TypeaheadCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService',
    function($scope, $routeParams, $location, LoudService) {

      LoudService.getDataFromJS().then(function(response) {
          $scope.data = angular.fromJson(response.data);
          otherFunctions();
      }, function(razon) {
          $scope.error = razon;
      });

      function otherFunctions () {
        var _selected;
        $scope.selected = undefined;

        $scope.ngModelOptionsSelected = function(value) {
          if (arguments.length) {
            _selected = value;
          } else {
            return _selected;
          }
        };

        $scope.modelOptions = {
          debounce: {
            default: 500,
            blur: 250
          },
          getterSetter: true
        };

        $scope.eventName = $scope.data.eventType;
        $scope.sites = $scope.data.location;
        $scope.events = $scope.data.events;
      }
  }
])