angular.module ('loudApp.controllers')

.controller('LocationsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout', '$q',
	function($scope, $routeParams, $location, LoudService, $timeout, $q) {

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

        //Agregar locación
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
                }
                
                $location.path('/locationsList');
            }

                var addItem = $q(function (resolve, reject) {
                    var res = LoudService.addItem(locationToCreate);

                    $timeout(
                        function() {
                            resolve(res)
                        }, Math.random() * 2000 + 1000);
                });

                addItem.then(function (response) {
                    if (response && response.success) {
                        $scope.processing = false;
                        $scope.error = null;
                        $scope.emailSent = true;
                    } else {
                        $scope.processing = false;
                        $scope.error = response.message;
                    }
                });
            }

            $scope.init();
        };
	}
])