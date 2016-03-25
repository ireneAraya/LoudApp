angular.module ('loudApp.controllers')

.controller('LoginCtrl', [
	'$scope', 'LoudService', '$window', '$timeout', 'Facebook',
	function($scope, LoudService, $window, $timeout, Facebook) {

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };

        function otherFunctions () {

            $scope.alerts = [
                {type: "danger", msg: "Oh snap! There is an error with your login credentials, please review and try again."},
                {type: "success", msg: "Welcome!"},
            ];

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
                            this.error = true;
                        }
                    }
                }
            };

            $scope.facebookLogin = function () {
                getLoginStatus();

                $scope.user = {};
                $scope.logged = false;

                $scope.byebye = false;
                $scope.salutation = false;

                $timeout(function () {
                    if (!window.FBUser) {
                        loginFB();
                    } else {
                        meFB();

                        $timeout(function () {
                            $scope.user = window.FBuserData;
                            otherFunctionsFB();
                        }, 1000);
                    }
                }, 1000);

                var otherFunctionsFB = function () {
                    console.log($scope.user);
                }
            }
        };

        function getLoginStatus () {
            Facebook.getLoginStatus(function(response) {
                if (response.status === "connected") {
                    window.FBUser = true;
                }
            }, true);
        }

        function loginFB () {
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    meFB();
                }
            });
        };

        function logoutFB () {
            Facebook.logout(function() {
                // $scope.$apply(function() {
                $scope.user   = {};
                $scope.logged = false;
                // });
            });
        }

        function meFB () {
            Facebook.api('/me', function(response) {
                // $scope.$apply(function() {
                window.FBuserData = response;
                // });
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