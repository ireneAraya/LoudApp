angular.module ('loudApp.controllers')

.controller('LocationsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService',
	function($scope, $routeParams, $location, LoudService) {
        $scope.locationsCol = LoudService.verify('LoudApp__Locations') || {};

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };


        function otherFunctions () {
            //$scope.locationsCol = $scope.data.locations;

            //Borrar sitio
            $scope.erraselocation = function ($index) {
                var target = LoudService.getItemIndex($scope.locationsCol, $index);

                if ($scope.locationsCol.length == 1) {
                    $scope.locationsCol = [];
                } else {
                    $scope.locationsCol.splice(target, 1);
                }

                var parent = document.getElementsByTagName("body")[0],
                    child = parent.lastChild;

                parent.removeChild(child);

                LoudService.save("LoudApp__Locations", $scope.locationsCol);

                $location.path('/locationsList');
            }

            //Agregar locación
            $scope.addLocation = function () {
                var lastID = 0;

                for (var i = 0; i < $scope.locationsCol.length; i++) {
                    lastID = (i +1);
                }

                //crea el objeto y lo agrega a la colección
                var location = {
                    id              : lastID,
                    image           : document.getElementById("locationImage").getAttribute("src"),
                    name            : $scope.location,
                    phone           : $scope.phone,
                    capacity        : $scope.capacity,
                    geographicLoc   : $scope.geographicLoc,
                    address         : $scope.address
                }
                $scope.locationsCol.push(location);

                console.table($scope.locationsCol);

                // Limpia el formulario, tanto en valores como en estado de variables
                if ($scope.addLocationForm) {
                  $scope.addLocationForm.$setPristine();
                  $scope.addLocationForm.$setUntouched();
                  $scope.location = "";
                  $scope.phone = "";
                  $scope.capacity = "";
                  $scope.geographicLoc = "";
                  $scope.address = "";
                }
                
                $location.path('/locationsList');
            }

        };

        $scope.$watch('locationsCol', function(newValue, oldValue) {
            LoudService.save("LoudApp__Locations", newValue);
        }, true);

        $scope.init();
	}
])