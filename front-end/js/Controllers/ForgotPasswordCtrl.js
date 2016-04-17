angular.module ('loudApp.controllers')

.controller('ForgotPasswordCtrl', [
	'$scope', 'LoudService', '$location', '$q', '$timeout',
	function($scope, LoudService, $location, $q, $timeout) {

        $scope.init = function() {
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
                        console.log(response);
                    });
                }
            }
        };

        $scope.init();
	}
])