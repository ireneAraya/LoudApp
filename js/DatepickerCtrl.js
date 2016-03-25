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
                var location = LoudService.getItem($scope.data.location, index);
                return location[key];
            };

            //Lama a la función getItem
            var currentID = $routeParams.id;
            $scope.event = LoudService.getItem($scope.data.events, currentID);
        };

        $scope.init();
	}
])