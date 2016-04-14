angular.module ('loudApp.controllers')

.controller('HeaderCtrl', [
  '$scope', 'LoudService', '$rootScope',
  function($scope, LoudService, $rootScope) {
    // $scope.user = LoudService.verify("LoudApp__User") || {};

    // if ($scope.user.name) {
    //   $scope.link = "#/profile";
    // } else {
    //   $scope.link = "#/login";
    // }

    // // Listens if there's any interection from the user
    // $rootScope.$on('userIsLoggedIn', function (event, args) {
    //     $scope.user = args.user || {};

    //     if ($scope.user.name) {
    //       $scope.link = "#/profile";
    //     } else {
    //       $scope.link = "#/login";
    //     }
    // });
  }
])