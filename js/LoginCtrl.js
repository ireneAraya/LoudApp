angular.module ('loudApp.controllers')

.factory('facebookService', function($q) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
})

.controller('LoginCtrl', [
	'$scope', 'LoudService', 'facebookService', '$window',
	function($scope, LoudService, facebookService, $window) {

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

                console.log(userExists);
            };

            $scope.facebookLogin = function () {
                $window.fbAsyncInit = function() {
                    FB.init({
                      appId: '1046016745413247',
                      status: true,
                      cookie: true,
                      xfbml: true,
                      version: 'v2.4'
                    });
                };

                facebookService.getMyLastName()
                    .then(function(response) {
                        $scope.last_name = response.last_name;
                    }
               );

                alert($scope.last_name);
            }
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