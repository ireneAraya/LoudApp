angular.module ('loudApp.controllers')

.controller('HeaderCtrl', [
  '$scope', 'LoudService', '$rootScope', '$q', '$timeout',
  function($scope, LoudService, $rootScope, $q, $timeout) {

    var userExists = $q(function (resolve, reject) {
        var res = LoudService.verifyUser();

        $timeout(
            function() {
                resolve(res)
            }, Math.random() * 2000 + 1000);
    });

    userExists.then(function (response) {
      console.log(response);

        if (response.success) {
          $scope.link = "#/profile";
          $scope.user = response.data;
        } else {
          $scope.link = "#/login";
          $scope.user = {};
        }
    });

    // Listens if there's any interection from the user
    $rootScope.$on('userIsLoggedIn', function (event, args) {
        $scope.user = args.user || {};

        if ($scope.user.firstName) {
          $scope.link = "#/profile";
        } else {
          $scope.link = "#/login";
        }
    });
  }
])