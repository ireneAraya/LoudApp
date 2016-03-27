angular.module ('loudApp.controllers')

.controller('ProfileCtrl', [
	'$scope', 'LoudService', '$location',
	function($scope, LoudService, $location) {

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
            if ($scope.user.id == "") {
                $location.path('/login');
            } else {
                console.log($scope.user);
            }

            $scope.logout = function () {
                // alert($scope.user.name);
            }
        };

        $scope.init();
	}
])