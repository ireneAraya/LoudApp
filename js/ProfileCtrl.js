angular.module ('loudApp.controllers')

.controller('ProfileCtrl', [
	'$scope', 'LoudService', '$location', '$timeout', 'Facebook',
	function($scope, LoudService, $location, $timeout, Facebook) {

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.user = LoudService.verify("LoudApp__User") || {};
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

            $scope.logout = function () {
                $scope.user = {};
                LoudService.save("LoudApp__User", $scope.user);
                $location.path("/");
            }

            $scope.logoutFB = function () {
                getLoginStatus();

                $timeout(function () {
                    if (window.FBUser) {
                        Facebook.logout(function (response) {});
                        window.FBUser = false;
                        window.FBuserData = {};
                        otherFunctionsFB();
                    }
                }, 1000);

                var otherFunctionsFB = function () {
                    // Logout Callback
                    $scope.user.image = null;
                    $scope.user = {};
                    $location.path("/");
                }
            }

            function getLoginStatus () {
                Facebook.getLoginStatus(function(response) {
                    if (response.status === "connected") {
                        window.FBUser = true;
                    } else {
                        window.FBUser = false;
                    }
                }, true);
            }

            $scope.$watch('user', function(newValue, oldValue) {
                LoudService.save("LoudApp__User", newValue);
            }, true);
        };

        $scope.init();
	}
])