angular.module ('loudApp.controllers')

.controller('EventsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout',
	function($scope, $routeParams, $location, LoudService, $timeout) {
        $scope.eventsCol = LoudService.verify("LoudApp__Events") || {};

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };


        function otherFunctions () {
            //$scope.eventsCol = $scope.data.events;

            $scope.getEventLocation = function (index, key) {
                var location = LoudService.getItem($scope.data.location, "id", index);
                return location[key];
            };

            // Solo cuando haya un ID en el URL definido
            if ($routeParams.id) {
                var currentID = $routeParams.id;
                $scope.event = LoudService.getItem($scope.eventsCol, "id", currentID);
                $scope.imageSource = $scope.event.image;

                $scope.fileNameChanged = function (element) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function() {
                            $scope.imageSource = e.target.result;
                        });
                    }
                    reader.readAsDataURL(element.files[0]);
                }
            }

            $scope.erraseEvent = function ($index) {
                var target = LoudService.getItemIndex($scope.eventsCol, $index);

                if ($scope.eventsCol.length == 1) {
                    $scope.eventsCol = [];
                } else {
                    $scope.eventsCol.splice(target, 1);
                }

                // $timeout(function () {
                    var parent = document.getElementsByTagName("body")[0],
                        child = parent.lastChild;

                    parent.removeChild(child);
                // }, 1000);


                LoudService.save("LoudApp__Events", $scope.eventsCol);

                $location.path('/eventsList');
            }
        };

        $scope.$watch('eventsCol', function(newValue, oldValue) {
            LoudService.save("LoudApp__Events", newValue);
        }, true);

        $scope.init();
	}
])