angular.module ('loudApp.controllers')

.controller('EventsCtrl', [
	'$scope', 'LoudService',
	function($scope, LoudService) {
		var Query = LoudService.Query();

		$scope.events = Query('events', '-', 'all');

	}
])