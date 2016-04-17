angular.module ('loudApp.controllers')

.controller('ProfileCtrl', [
	'$scope', 'LoudService', '$location', '$timeout', 'LoudFB', '$rootScope', '$q',
	function($scope, LoudService, $location, $timeout, LoudFB, $rootScope, $q) {

        $scope.user = LoudService.verify("LoudApp__User") || {};

        if (isFacebookUser($scope.user)) {
            $scope.user_fullName = $scope.user.first_name + " " + $scope.user.last_name;
        } else {
            $scope.user_fullName = $scope.user.firstName;

            if ($scope.user.middleName !== "") {
                $scope.user_fullName += " " + $scope.user.middleName;
            }

            $scope.user_fullName += " " + $scope.user.lastName;

            if ($scope.user.secondSurname !== "") {
                $scope.user_fullName += " " + $scope.user.secondSurname;
            }
        }

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };


        function otherFunctions () {
            // Checks if the user exits
            if (!$scope.user.id) {
                $location.path('/login');
            }

            // Main system logout function
            $scope.logout = function () {
                $scope.user = {};

                var session = $q(function (resolve, reject) {
                    var res = LoudService.logoutUser();

                    $timeout(
                        function() {
                            resolve(res)
                        }, Math.random() * 2000 + 1000);
                });

                session.then(function (response) {
                    if (response.success) {
                        $location.path("/");
                        $rootScope.$broadcast('userIsLoggedIn', { user : null });
                    } else {
                        $scope.error = response.message;
                    }
                });

            }

            // Facebook logout function
            $scope.logoutFB = function () {
                LoudFB.getLoginStatus().then(function (isLoggedIn) {
                    if (isLoggedIn) {
                        LoudFB.logout().then(function (response) {

                            // Removes the user data from localStorage
                            $scope.user = {};
                            LoudService.remove("LoudApp__FB_authResponse");

                            // Tells the HeaderCtrl that a user has been disconnected
                            $rootScope.$broadcast('userIsLoggedIn', { user : null });

                            // Redirects to the Homepage
                            $location.path("/");
                        });
                    }
                });
            };
        };

        $scope.init();

        $scope.$watch('user', function(newValue, oldValue) {
            LoudService.save("LoudApp__User", newValue);
        }, true);

        function isFacebookUser (userData) {
          var result = false;
          if (userData.facebook) {
            result = true;
          }
          return result;
        }
	}
])