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
        var alreadyUser = localStorage.getItem("LoudApp__User");

        if (response.success && alreadyUser !== "null" && response.data) {

          $scope.user = response.data;

          // if ($scope.user.rol === "1") {
          //   $scope.link = "#/adminMenu";
          // } else {
            $scope.link = "#/profile";
          // }

          if (isFacebookUser($scope.user)) {
            $scope.user_fullName = $scope.user.first_name + " " + $scope.user.last_name;
          } else {
            $scope.user_fullName = $scope.user.firstName + " " + $scope.user.lastName;
          }

        } else {
          $scope.link = "#/login";
          $scope.user = {};
        }
    });

    // Listens if there's any interection from the user
    $rootScope.$on('userIsLoggedIn', function (event, args) {
        $scope.user = args.user || {};

        if ($scope.user.id) {

          // if ($scope.user.rol === "1") {
          //   $scope.link = "#/adminMenu";
          // } else {
            $scope.link = "#/profile";
          // }

          if (isFacebookUser($scope.user)) {
            $scope.user_fullName = $scope.user.first_name + " " + $scope.user.last_name;
          } else {
            $scope.user_fullName = $scope.user.firstName + " " + $scope.user.lastName;
          }

        } else {
          $scope.link = "#/login";
          $scope.user_fullName = null;
        }
    });

    function isFacebookUser (userData) {
      var result = false;
      if (userData && userData.facebook) {
        result = true;
      }
      return result;
    }
  }
])