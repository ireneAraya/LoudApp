angular.module ('loudApp.controllers')

.controller('ForgotPasswordCtrl', [
	'$scope', 'LoudService', '$location', '$q', '$timeout',
	function($scope, LoudService, $location, $q, $timeout) {

        $scope.init = function() {
            $scope.emailSent = false;
            otherFunctions();
        };

        function otherFunctions () {
            $scope.requestNewPassword = function () {
                if ($scope.passwordForm.$valid) {
                    var session = $q(function (resolve, reject) {
                        var res = LoudService.requestNewPassword($scope.email);

                        $timeout(
                            function() {
                                resolve(res)
                            }, Math.random() * 2000 + 1000);
                    });

                    session.then(function (response) {
                        if (response.success) {
                            $scope.emailSent = true;
                        } else {
                            $scope.emailSent = false;
                        }
                    });
                }
            }
        };

        $scope.init();
	}
])