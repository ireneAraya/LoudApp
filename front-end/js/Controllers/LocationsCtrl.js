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


        // function otherFunctions () {
        //     //$scope.locationsCol = $scope.data.locations;

        //     //Borrar sitio
        //     $scope.erraselocation = function ($index) {
        //         var target = LoudService.getItemIndex($scope.locationsCol, $index);

        //         if ($scope.locationsCol.length == 1) {
        //             $scope.locationsCol = [];
        //         } else {
        //             $scope.locationsCol.splice(target, 1);
        //         }

        //         var parent = document.getElementsByTagName("body")[0],
        //             child = parent.lastChild;

        //         parent.removeChild(child);

        //         LoudService.save("LoudApp__Locations", $scope.locationsCol);

        //         $location.path('/locationsList');
        //     }

        //     //Agregar locación
        //     $scope.addLocation = function () {
        //         var lastID = 0;

        //         for (var i = 0; i < $scope.locationsCol.length; i++) {
        //             lastID = (i +1);
        //         }

        //         //crea el objeto y lo agrega a la colección
        //         var location = {
        //             id              : lastID,
        //             image           : document.getElementById("locationImage").getAttribute("src"),
        //             name            : $scope.location,
        //             phone           : $scope.phone,
        //             capacity        : $scope.capacity,
        //             geographicLoc   : $scope.geographicLoc,
        //             address         : $scope.address
        //         }
        //         $scope.locationsCol.push(location);

        //         console.table($scope.locationsCol);

        //         // Limpia el formulario, tanto en valores como en estado de variables
        //         if ($scope.addLocationForm) {
        //           $scope.addLocationForm.$setPristine();
        //           $scope.addLocationForm.$setUntouched();
        //           $scope.location = "";
        //           $scope.phone = "";
        //           $scope.capacity = "";
        //           $scope.geographicLoc = "";
        //           $scope.address = "";
        //         }
                
        //         $location.path('/locationsList');
        //     }

        // };

        // $scope.$watch('locationsCol', function(newValue, oldValue) {
        //     LoudService.save("LoudApp__Locations", newValue);
        // }, true);

        $scope.init();
	}
])