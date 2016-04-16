angular.module ('loudApp.controllers')

.controller('LoginCtrl', [
	'$scope', 'LoudService', 'LoudFB', '$location', '$q', '$rootScope', '$timeout',
	function($scope, LoudService, LoudFB, $location, $q, $rootScope, $timeout) {

        // $scope.user = LoudService.verify("LoudApp__User") || {};

        $scope.init = function() {
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
                    $scope.user = response.data;

                    // Tells the HeaderCtrl that a user has logged in a session
                    $rootScope.$broadcast('userIsLoggedIn', { "user" : $scope.user });
                    $location.path("/");
                }
            });

            // Calbacks
            otherFunctions();
        };

        function otherFunctions () {
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

                                // Tells the HeaderCtrl that a user has logged in a session
                                $rootScope.$broadcast('userIsLoggedIn', { "user" : $scope.user });
                                $location.path("/");
                            }
                        });
                    }
                });

                // var usersCollection = $scope.data.users,
                //     userExists = false;

                // var userEmail = $scope.email,
                //     userPass = encodeValue($scope.password);

                // if (userEmail !== "" && userPass !== "") {
                //     for (var i = 0; i < usersCollection.length; i++) {
                //         var user = usersCollection[i];

                //         if (userEmail === user.email && decodeValue(userPass) === decodeValue(user.password)) {
                //             userExists = true;
                //         }
                //     }
                // }

                // $scope.user = (userExists) ? LoudService.getItem(usersCollection, "email", userEmail) : {};
                // $scope.user.facebook = false;

                // Tells the HeaderCtrl that a user has logged in a session
                // $rootScope.$broadcast('userIsLoggedIn', { user : $scope.user });
                $scope.logginUser = false;
                // $location.path("/");
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
        };

        function getFBUserData ($scope) {
            LoudFB.meFB().then(function (FBUserData) {
                // Saves the user info to localStorage
                LoudService.save("LoudApp__User", FBUserData);

                $scope.user = FBUserData;

                LoudFB.getUserProfilePicture().then(function (userPhotoURL) {
                    // Sets the URL for the user photo
                    $scope.user.image = userPhotoURL;
                    $scope.user.facebook = true;

                    // Tells the HeaderCtrl that a user has logged in a session
                    $rootScope.$broadcast('userIsLoggedIn', { user : $scope.user });

                    $scope.logginUser = false;

                    // Redirects to Homepage
                    $location.path("/");
                });
            });
        };

        function decodeValue (string) {
            return atob(string);
        };

        function encodeValue (string) {
            return btoa(string);
        };

        $scope.init();

        $scope.$watch('user', function(newValue, oldValue) {
            LoudService.save("LoudApp__User", newValue);
        }, true);
	}
])