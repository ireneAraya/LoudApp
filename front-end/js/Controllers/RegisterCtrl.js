angular.module ('loudApp.controllers')

.controller('RegisterCtrl', [
	'$scope', 'LoudService', '$location', '$q', '$timeout',
	function($scope, LoudService, $location, $q, $timeout) {

        $scope.init = function() {
            $scope.getPicturePath = function (a, b, c) {
                console.log(a, b, c);
            };

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
            // console.log(editItem._attachments_uri.image);
        };

        $scope.init();
	}
])