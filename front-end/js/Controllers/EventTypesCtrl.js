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


        // function otherFunctions () {
        //     $scope.eventTypesCol = $scope.data.eventTypes;
        
        //     //Agregar tipo de evento
        //     $scope.addEventType = function () {
        //         var lastID = 0;

        //         for (var i = 0; i < $scope.eventTypesCol.length; i++) {
        //             lastID = (i +1);
        //         };

        //         //crea el objeto y lo agrega a la colección
        //         var eventType = {
        //             id              : lastID,
        //             description     : $scope.eventType,
        //         }
        //         $scope.eventTypesCol.push(eventType);

        //         // Limpia el formulario, tanto en valores como en estado de variables
        //         if ($scope.addLocationForm) {
        //             $scope.addLocationForm.$setPristine();
        //             $scope.addLocationForm.$setUntouched();
        //             $scope.eventType = "";
        //         }

        //         console.table($scope.eventTypesCol);

        //         $location.path('/eventTypesList');
        //     }

        //     //Borrar tipo de evento
        //     $scope.erraseEventType = function ($index) {
        //         var target = LoudService.getItemIndex($scope.eventTypesCol, $index);

        //         if ($scope.eventTypesCol.length == 1) {
        //             $scope.eventTypesCol = [];
        //         } else {
        //             $scope.eventTypesCol.splice(target, 1);
        //         }

        //             var parent = document.getElementsByTagName("body")[0],
        //                 child = parent.lastChild;

        //             parent.removeChild(child);


        //         LoudService.save("LoudApp__EventTypes", $scope.eventTypesCol);

        //         $location.path('/eventTypesList');
        //     }

        // };

        // $scope.$watch('eventTypesCol', function(newValue, oldValue) {
        //     LoudService.save("LoudApp__EventTypes", newValue);
        // }, true);

        $scope.init();
	}
])