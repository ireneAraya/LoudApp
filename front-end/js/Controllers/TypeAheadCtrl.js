angular.module ('loudApp.controllers')

.controller('TypeaheadCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService',
    function($scope, $routeParams, $location, LoudService) {
      $scope.locationsCol = LoudService.verify('LoudApp__Locations') || {};
      $scope.eventTypesCol = LoudService.verify('LoudApp__EventTypes') || {};
      $scope.usersCol = LoudService.verify('LoudApp__Users') || {};

      LoudService.getDataFromJS().then(function(response) {
          $scope.data = angular.fromJson(response.data);
          otherFunctions();
      }, function(razon) {
          $scope.error = razon;
      });

      function otherFunctions () {

        $scope.modelOptions = {
          debounce: {
            default: 500,
            blur: 250
          },
          getterSetter: true
        };

        $scope.eventTypes = $scope.eventTypesCol;
        $scope.eventLocations = $scope.locationsCol;
        $scope.events = $scope.data.events;
        $scope.users = $scope.usersCol;
      }
  }
])