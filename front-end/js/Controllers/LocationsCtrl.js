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

        //Add location
        $scope.addLocation = function () {
            // Disables the register button while processing
            $scope.processing = true;
            $scope.error = null;

            // Creates the object
            var locationToCreate = {
                image           : document.getElementById("locationImage").getAttribute("src"),
                name            : $scope.location.name,
                contactPhone    : $scope.location.contactPhone,
                capacity        : $scope.location.capacity,
                geolocation     : $scope.location.geolocation,
                address         : $scope.location.address
            };

            var addItem = $q(function (resolve, reject) {
                var res = LoudService.addItem(locationToCreate);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            addItem.then(function (response) {
                console.log(response);

                if (response && response.success) {
                    $location.path("/locationsList");
                }
            });

        }

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