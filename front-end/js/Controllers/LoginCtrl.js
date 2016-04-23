angular.module ('loudApp.controllers')

.controller('LoginCtrl', [
	'$scope', 'LoudService', 'LoudFB', '$location', '$q', '$rootScope', '$timeout',
	function($scope, LoudService, LoudFB, $location, $q, $rootScope, $timeout) {

        $scope.init = function() {

            $scope.user = {};

            var userExists = $q(function (resolve, reject) {
                var res = LoudService.verifyUser();

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            userExists.then(function (response) {
                if (response.success) {
                    $scope.user = response.data;
                    $scope.user.facebook = false;

                    // Tells the HeaderCtrl that a user has logged in a session
                    $rootScope.$broadcast('userIsLoggedIn', { "user" : $scope.user });

                    if ($scope.user.rol === "1") {
                        $location.path("/adminMenu");
                    } else {
                        $location.path("/");
                    }

                } else {
                    $scope.user = {};
                }
            });
        };

        $scope.login = function () {
            $scope.logginUser = true;

           var callService = $q(function (resolve, reject) {
                var res = LoudService.loginUser($scope.email, $scope.password);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            callService.then(function (response) {
                if (!response.success) {
                    $scope.error = response.message;
                } else {
                    var userExists = $q(function (resolve, reject) {
                        var res = LoudService.verifyUser();

                        $timeout(
                            function() {
                                resolve(res)
                            }, Math.random() * 2000 + 1000);
                    });

                    userExists.then(function (response) {
                        if (response.success) {
                            $scope.user = response.data;
                            $scope.user.facebook = false;

                            // Tells the HeaderCtrl that a user has logged in a session
                            $rootScope.$broadcast('userIsLoggedIn', { "user" : $scope.user });

                            if ($scope.user.rol === "1") {
                              $location.path("/adminMenu");
                            } else {
                              $location.path("/");
                            }
                        }
                    });
                }
            });
        };

        $scope.facebookLogin = function () {
            $scope.logginUser = true;
            LoudFB.getLoginStatus().then(function (isLoggedIn) {
                                            if (!isLoggedIn) {
                                                // Logs in the user with Facebook
                                                LoudFB.login().then(function (response) {
                                                    if (response.status === "connected") {
                                                        // Saves the @authResponse in the localStorage
                                                        LoudService.save("LoudApp__FB_authResponse", response.authResponse);

                                                        getFBUserData($scope);
                                                    }
                                                });
                                            } else {
                                                getFBUserData($scope);
                                            }
                                        });
        };

        function getFBUserData ($scope) {
            LoudFB.meFB().then(function (FBUserData) {
                // Saves the user info to localStorage
                LoudService.save("LoudApp__User", FBUserData);

                $scope.user = FBUserData;

                LoudFB.getUserProfilePicture().then(function (userPhotoURL) {
                    // Sets the URL for the user photo
                    $scope.user.photoURL = userPhotoURL;
                    $scope.user.facebook = true;

                    // Tells the HeaderCtrl that a user has logged in a session
                    $rootScope.$broadcast('userIsLoggedIn', { user : $scope.user });

                    // Redirects to Homepage
                    $location.path("/");
                });
            });
        };

        $scope.init();

        $scope.$watch('user', function(newValue, oldValue) {
            LoudService.save("LoudApp__User", newValue);
        }, true);
	}
])