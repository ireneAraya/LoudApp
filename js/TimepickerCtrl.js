angular.module ('loudApp.controllers')

.controller('TimepickerCtrl', [
	'$scope', '$log',
	function($scope, $log) { 
		$scope.updatedTime = new Date();

		$scope.hstep = 1;
		$scope.mstep = 15;

		$scope.options = {
		    hstep: [1, 2, 3],
		    mstep: [1, 5, 10, 15, 25, 30]
		};

		$scope.ismeridian = true;
		$scope.toggleMode = function() {
		    $scope.ismeridian = ! $scope.ismeridian;
		};

		$scope.update = function() {
		    var d = new Date();
		    d.setHours( 14 );
		    d.setMinutes( 0 );
		    $scope.updatedTime = d;
		};

		$scope.changed = function () {
		    $log.log('Time changed to: ' + $scope.updatedTime);
		};

		$scope.clear = function() {
		    $scope.updatedTime = null;
		};
	}
])