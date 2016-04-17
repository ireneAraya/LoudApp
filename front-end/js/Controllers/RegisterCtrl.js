angular.module ('loudApp.controllers')

.controller('RegisterCtrl', [
	'$scope', 'LoudService', '$location', '$q', '$timeout',
	function($scope, LoudService, $location, $q, $timeout) {

        $scope.init = function() {
            $scope.newImageSource = "/front-end/img/users/profilePlaceholder.png";

            var userExists = $q(function (resolve, reject) {
                var res = LoudService.verifyUser();

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            userExists.then(function (response) {
                if (response.success) {
                    $location.path("/");
                } else {
                    // Calbacks
                    otherFunctions();
                }
            });
        };

        function otherFunctions () {

        };

        $scope.init();

        $scope.$watch('newImageSource', function(newValue, oldValue) {
            LoudService.save("LoudApp__User", newValue);
        }, true);
	}
])