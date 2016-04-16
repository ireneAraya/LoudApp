angular.module ('loudApp.controllers')

.controller('RegisterCtrl', [
	'$scope', 'LoudService', 'LoudFB', '$location', '$q', '$rootScope', '$timeout',
	function($scope, LoudService, LoudFB, $location, $q, $rootScope, $timeout) {

        $scope.init = function() {
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
            console.debug("Register!");
        };

        $scope.init();

        // $scope.$watch('user', function(newValue, oldValue) {
        //     LoudService.save("LoudApp__User", newValue);
        // }, true);
	}
])