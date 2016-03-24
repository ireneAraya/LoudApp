angular.module ('loudApp.controllers')

.controller('LoginCtrl', [
	'$scope', 'LoudService',
	function($scope, LoudService) {

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
                    userPass = $scope.password;

                if (userEmail !== "" && userPass !== "") {
                    for (var i = 0; i < usersCollection.length; i++) {
                        var user = usersCollection[i];

                        if (userEmail === user.email && userPass === user.password) {
                            userExists = true;
                        }
                    }
                }

                console.log(userExists);
            }
        };

        $scope.init();
	}
])