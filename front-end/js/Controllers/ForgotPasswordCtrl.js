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
                    console.log("Valid!");
                }
            }
        };

        $scope.init();
	}
])