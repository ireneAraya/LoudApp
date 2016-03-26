angular.module ('loudApp.controllers')

.controller('EventsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService',
	function($scope, $routeParams, $location, LoudService) {

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };

        function otherFunctions () {
            $scope.getEventLocation = function (index, key) {
                var location = LoudService.getItem($scope.data.location, "id", index);
                return location[key];
            };

            //Lama a la función getItem
            var currentID = $routeParams.id;
            $scope.event = LoudService.getItem($scope.data.events, "id", currentID);

            $scope.erraseEvent = function () {
                if ($scope.data.events.lenght == 1) {
                    $scope.data.events = [];
                    $scope.lastID = 0;
                } else {
                    var target = LoudService.getItemIndex($scope.data.events, currentID);
                    $scope.data.events.splice(target,1);
                }
                $location.path('/eventsList');
                console.table($scope.data.events);
            }
        };

        $scope.init();
	}
])