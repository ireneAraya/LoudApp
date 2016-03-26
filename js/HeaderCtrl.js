angular.module ('loudApp.controllers')

.controller('HeaderCtrl', [
  '$scope', 'LoudService',
  function($scope, LoudService) {
    $scope.user = LoudService.verify("LoudApp__User") || {};

    console.log($scope.user.name);

    if ($scope.user.name) {
      $scope.link = "#/profile";
    } else {
      $scope.link = "#/login";
    }

    $scope.$watch('user', function(newValue, oldValue) {
        $scope.user = newValue;
    }, true);
  }
])