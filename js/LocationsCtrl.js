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

            // Editar Imagen
            if ($routeParams.id) {
                var currentID = $routeParams.id;
                $scope.location = LoudService.getItem($scope.locationsCol, "id", currentID);
                
                $scope.imageSource = $scope.location.image;

                $scope.fileNameChanged = function (element) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function() {
                            $scope.imageSource = e.target.result;
                        });
                    }
                    reader.readAsDataURL(element.files[0]);
                }
            };
        };

        $scope.$watch('locationsCol', function(newValue, oldValue) {
            LoudService.save("LoudApp__Locations", newValue);
        }, true);

        $scope.init();
	}
])