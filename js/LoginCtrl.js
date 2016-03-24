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
            console.log($scope.data);
        };

        $scope.init();
	}
])