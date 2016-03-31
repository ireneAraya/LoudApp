angular.module ('loudApp.controllers')

.controller('LocationsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService',
	function($scope, $routeParams, $location, LoudService) {
        // $scope.locationsCol = LoudService.verify('LoudApp__Locations') || {};

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };


        function otherFunctions () {
            $scope.locations = $scope.data.locations;
        };

        // $scope.$watch('locationsCol', function(newValue, oldValue) {
        //     LoudService.save("LoudApp__Locations", newValue);
        // }, true);

        $scope.init();
	}
])