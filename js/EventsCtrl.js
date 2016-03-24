angular.module ('loudApp.controllers')

.controller('EventsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService',
	function($scope, $routeParams, $location, LoudService) {
        var currentID = $routeParams.id;

         //Lama a la función getItem
        $scope.event = LoudService.getItem($scope.data.event, currentID);

		$scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = response.data;
            }, function(razon) {
                $scope.error = razon;
            });
        };
        
        $scope.getEventLocation = function (index, key) {
        	var location = LoudService.getItem($scope.data.location, index);
        	return location[key];
        }
        
        $scope.init();
	}
])