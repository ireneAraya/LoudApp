angular.module ('loudApp.controllers')

.controller('EventsCtrl', [
	'$scope', 'LoudService',
	function($scope, LoudService) {

		$scope.init = function() {
            LoudService.getDataFromJS().then(function(respuesta) {
                $scope.data = respuesta.data;
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