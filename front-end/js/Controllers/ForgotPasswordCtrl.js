angular.module ('loudApp.controllers')

.controller('ForgotPasswordCtrl', [
	'$scope', 'LoudService', '$location', '$q', '$timeout',
	function($scope, LoudService, $location, $q, $timeout) {

        $scope.init = function() {
            $scope.processing = false;
            $scope.errorMessage = "";
            $scope.error = false;
        };

        $scope.requestNewPassword = function () {
            if ($scope.passwordForm.$valid) {
                $scope.processing = true;

                var request = $q(function (resolve, reject) {
                    var res = LoudService.requestNewPassword($scope.email);

                    $timeout(
                        function() {
                            resolve(res)
                        }, Math.random() * 2000 + 1000);
                });

                request.then(function (response) {
                    console.log(response);

                    if (response.error) {
                        $scope.error = true;
                        $scope.emailSent = false;
                        $scope.errorMessage = response.message;
                    } else {
                        $scope.error = false;
                        $scope.emailSent = true;
                    }

                    $scope.processing = false;
                });
            }
        };

        $scope.init();
	}
])