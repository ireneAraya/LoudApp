angular.module ('loudApp.controllers')

.controller('ProfileCtrl', [
	'$scope', 'LoudService', '$location', '$timeout', 'LoudFB', '$rootScope',
	function($scope, LoudService, $location, $timeout, LoudFB, $rootScope) {

        $scope.user = LoudService.verify("LoudApp__User") || {};

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

                // LoudService.logoutUser();

                // Tells the HeaderCtrl that a user has logged in a session
                $rootScope.$broadcast('userIsLoggedIn', { user : null });

                $location.path("/");
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
	}
])