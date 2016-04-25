angular.module ('loudApp.controllers')

.controller('ProfileCtrl', [
	'$scope', 'LoudService', '$location', '$timeout', 'LoudFB', '$rootScope', '$q',
	function($scope, LoudService, $location, $timeout, LoudFB, $rootScope, $q) {


        $scope.init = function() {
            $scope.user = LoudService.verify("LoudApp__User") || {};

            if (!$scope.user.id) {
                $location.path('/login');
            }

            if (isFacebookUser($scope.user)) {
                $scope.user_fullName = $scope.user.first_name + " " + $scope.user.last_name;
            } else {
                $scope.user_fullName = $scope.user.firstName;

                if ($scope.user.middleName !== "" && $scope.user.middleName !== null) {
                    $scope.user_fullName += " " + $scope.user.middleName;
                }

                $scope.user_fullName += " " + $scope.user.lastName;

                if ($scope.user.secondSurname !== "" && $scope.user.secondSurname !== null) {
                    $scope.user_fullName += " " + $scope.user.secondSurname;
                }
            }
        };


        // Main system logout function
        $scope.logout = function () {
            $scope.endingSession = true;

            var session = $q(function (resolve, reject) {
                var res = LoudService.logoutUser();

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            session.then(function (response) {
                console.log(response);

                if (response && response.success) {
                    $location.path("/login");
                    $scope.user = {};
                    $rootScope.$broadcast('userIsLoggedIn', { user : null });
                    LoudService.remove("LoudApp__User");
                } else {
                    $scope.error = response.message;
                }
            });
        };

        // Facebook logout function
        $scope.logoutFB = function () {
            $scope.endingSession = true;

            LoudFB.getLoginStatus().then(function (isLoggedIn) {
                if (isLoggedIn) {
                    LoudFB.logout().then(function (response) {

                        // Removes the user data from localStorage
                        $scope.user = {};
                        LoudService.remove("LoudApp__FB_authResponse");

                        // Tells the HeaderCtrl that a user has been disconnected
                        $rootScope.$broadcast('userIsLoggedIn', { user : null });

                        // Redirects to the Homepage
                        $location.path("/login");
                    });
                }
            });
        };

        function isFacebookUser (userData) {
          var result = false;
          if (userData && userData.facebook) {
            result = true;
          }
          return result;
        }

        $scope.init();

        $scope.$watch('user', function(newValue, oldValue) {
            LoudService.save("LoudApp__User", newValue);
        }, true);
	}
])