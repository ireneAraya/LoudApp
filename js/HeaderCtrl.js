angular.module ('loudApp.controllers')

.controller('HeaderCtrl', [
  '$scope', 'LoudService', '$timeout',
  function($scope, LoudService, $timeout) {
    $scope.user = LoudService.verify("LoudApp__User") || {};

    if ($scope.user.name) {
      $scope.link = "#/profile";
    } else {
      $scope.link = "#/login";
    }
  }
])