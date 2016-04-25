angular.module ('loudApp.controllers')

.controller('eventTypesCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout', '$q', '$window',
	function($scope, $routeParams, $location, LoudService, $timeout, $q, $window) {

        $scope.init = function() {

            $scope.eventTypesCol = [];
            $scope.loadingData = true;
            $scope.allowedUser = false;

            if (LoudService.isAllowedUser()) {
                $scope.allowedUser = true;

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
            }
        };

        $scope.erraseEventType = function (eventTypeId) {
            $scope.processing = true;
            var deleteEventType = $q(function (resolve, reject) {
                var res = LoudService.deleteItem("eventTypes", eventTypeId);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            deleteEventType.then(function (response) {
                if (response && response.success) {
                    $window.location.reload();
                    $scope.processing = false;
                }
            });
        };

        $scope.addEventType = function () {
            $scope.processing = true;

            var eventTypeToCreate = {
                "name" : $scope.eventType
            };

            var addItem = $q(function (resolve, reject) {
                var res = LoudService.addItem("eventTypes", eventTypeToCreate);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            addItem.then(function (response) {
                $scope.processing = false;
                if (response && response.success) {
                    $location.path("/eventTypesList");
                } else {
                    $scope.error = true;
                    $scope.message = response.message;
                }
            });
        };

        $scope.init();
	}
])