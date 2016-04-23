angular.module ('loudApp.controllers')

.controller('eventTypesCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout', '$q',
	function($scope, $routeParams, $location, LoudService, $timeout, $q) {

        $scope.init = function() {

            $scope.eventTypesCol = [];
            $scope.loadingData = true;

            var getEventTypes = $q(function (resolve, reject) {
                var res = LoudService.getCollection("eventTypes");

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            getEventTypes.then(function (response) {
                if (response && response.data) {
                    $scope.eventTypesCol = response.data;
                }    

                $scope.loadingData = false;
            });
        };

        $scope.erraseEventType = function (eventTypeId) {
            var deleteEventType = $q(function (resolve, reject) {
                var res = LoudService.deleteItem("eventType", eventTypeId);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            deleteEvent.then(function (response) {
                if (response && response.success) {
                    $location.reload();
                }
            });
        }

        $scope.init();
	}
])