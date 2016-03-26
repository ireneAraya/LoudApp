angular.module ('loudApp.controllers')

.controller('LoginCtrl', [
	'$scope', 'LoudService', '$window', '$timeout', 'Facebook',
	function($scope, LoudService, $window, $timeout, Facebook) {

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
            $scope.$watch('user', function(newValue, oldValue) {
                LoudService.save("LoudApp__User", newValue);
            }, true);

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
            };

            $scope.facebookLogin = function () {
                getLoginStatus();

                $timeout(function () {
                    if (!window.FBUser) {
                        loginFB();
                        $timeout(function () {
                            $scope.user = window.FBuserData;
                            otherFunctionsFB();
                        }, 3000);
                    }
                }, 1000);

                var otherFunctionsFB = function () {
                    // Login with Facebook Callback
                    // LoudService.save("LoudApp__User", $scope.user);

                    Facebook.api("/me/albums", function(response) {
                        // console.log(response);
                        for (album in response.data) {
                            if (response.data[album].name == "Profile Pictures") {
                                FB.api(response.data[album].id + "/photos", function(response) {
                                    window.FBUserPicture = response.data[0].images[0].source;
                                });
                            }
                        }
                    }, {
                        scope : "user_photos"
                    });

                    $timeout(function(){
                        var image = (window.FBUserPicture) ? window.FBUserPicture : "/img/profilePlaceholder.png";
                        $scope.user = LoudService.verify("LoudApp__User");
                        $scope.user.image = image;
                        LoudService.save("LoudApp__User", $scope.user);
                    }, 2000);

                };
            }
        };

        function getLoginStatus () {
            Facebook.getLoginStatus(function(response) {
                if (response.status === "connected") {
                    window.FBUser = true;
                } else {
                    window.FBUser = false;
                }
            }, true);
        }

        function loginFB () {
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    meFB();
                }
            }, {
                scope : "public_profile,email,user_friends,user_photos"
            });
        };

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
            }
        }

        function meFB () {
            Facebook.api('/me', function(response) {
                window.FBuserData = response;
                LoudService.save("LoudApp__User", window.FBuserData);
            });
        };

        function decodeValue (string) {
            return atob(string);
        };

        function encodeValue (string) {
            return btoa(string);
        };

        $scope.init();
	}
])