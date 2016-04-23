angular.module ('loudApp.controllers')

.controller('LocationsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout', '$q', '$window',
	function($scope, $routeParams, $location, LoudService, $timeout, $q, $window) {

        $scope.init = function() {

            $scope.locationsCol = [];
            $scope.loadingData = true;

            var getLocations = $q(function (resolve, reject) {
                var res = LoudService.getCollection("locations");

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            getLocations.then(function (response) {
                if (response && response.data) {
                    $scope.locationsCol = response.data;
                }

                $scope.loadingData = false;
            });
        };

        $scope.erraseLocation = function (locationId) {
            var deleteEvent = $q(function (resolve, reject) {
                var res = LoudService.deleteItem("locations", locationId);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            deleteEvent.then(function (response) {
                if (response && response.success) {
                    $window.location.reload();
                }
            });
        };

        $scope.init();
	}
])