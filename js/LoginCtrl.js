angular.module ('loudApp.controllers')

.controller('LoginCtrl', [
	'$scope', 'LoudService', 'LoudFB', '$location', '$q', '$rootScope',
	function($scope, LoudService, LoudFB, $location, $q, $rootScope) {

        $scope.user = LoudService.verify("LoudApp__User") || {};

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };

        function otherFunctions () {
            if ($scope.user.id) {
                $location.path("/");
            }

            $scope.login = function () {
                var usersCollection = $scope.data.users,
                    userExists = false;

                var userEmail = $scope.email,
                    userPass = encodeValue($scope.password);

                if (userEmail !== "" && userPass !== "") {
                    for (var i = 0; i < usersCollection.length; i++) {
                        var user = usersCollection[i];

                        if (userEmail === user.email && decodeValue(userPass) === decodeValue(user.password)) {
                            userExists = true;
                        }
                    }
                }

                $scope.user = (userExists) ? LoudService.getItem(usersCollection, "email", userEmail) : {};
                LoudService.save("LoudApp__User", $scope.user);
                $location.path("/");
            };

            $scope.facebookLogin = function () {
                LoudFB.getLoginStatus().then(function (isLoggedIn) {
                                                if (!isLoggedIn) {
                                                    // Logs in the user with Facebook
                                                    LoudFB.login().then(function (response) {
                                                        if (response.status === "connected") {
                                                            // Saves the @authResponse in the localStorage
                                                            LoudService.save("LoudApp__FB_authResponse", response.authResponse);

                                                            LoudFB.meFB().then(function (FBUserData) {
                                                                // Saves the user info to localStorage
                                                                LoudService.save("LoudApp__User", FBUserData);

                                                                $scope.user = FBUserData;

                                                                LoudFB.getUserProfilePicture().then(function (userPhotoURL) {
                                                                    // Sets the URL for the user photo
                                                                    $scope.user.image = userPhotoURL;

                                                                    // Tells the HeaderCtrl that a user has logged in a session
                                                                    $rootScope.$broadcast('userIsLoggedIn', { user : $scope.user });

                                                                    // Redirects to Homepage
                                                                    $location.path("/");
                                                                });
                                                            });
                                                        }
                                                    });
                                                }
                                            });
            };
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