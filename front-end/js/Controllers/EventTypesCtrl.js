angular.module ('loudApp.controllers')

.controller('eventTypesCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService',
	function($scope, $routeParams, $location, LoudService) {
        $scope.eventTypesCol = LoudService.verify('LoudApp__EventTypes') || {};

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };


        function otherFunctions () {
            //$scope.eventTypesCol = $scope.data.eventTypes;

            $scope.edit = function () {
                
            }
        
            //Agregar tipo de evento
            // $scope.save = function () {

            //     var currentID = $routeParams.id;
            //     $scope.eventType = LoudService.getItem($scope.eventTypesCol, 'id', currentID);
            //     var lastID = 0;

            //     for (var i = 0; i < $scope.eventTypesCol.length; i++) {
            //         lastID = (i +1);
            //     }


            //     if ($scope.eventType[currentID] == null) {
            //         eventType = {
            //                 id              : lastID,
            //                 description     : $scope.newEventType
            //             }

            //             $scope.eventTypesCol.push(eventType);
            //     } else {
            //         $scope.eventType = {
            //             id          : currentID,
            //             description : $scope.newEventType
            //         }
            //         $scope.eventTypesCol.push(eventType);
            //     }

            //     console.table($scope.eventTypesCol);

            //     // Limpia el formulario, tanto en valores como en estado de variables
            //     if ($scope.addLocationForm) {
            //       $scope.addLocationForm.$setPristine();
            //       $scope.addLocationForm.$setUntouched();
            //       $scope.newEventType = "";
            //     }
                
            //     $location.path('/eventTypesList');

            // }

            //Borrar tipo de evento
            $scope.erraseEventType = function ($index) {
                var target = LoudService.getItemIndex($scope.eventTypesCol, $index);

                if ($scope.eventTypesCol.length == 1) {
                    $scope.eventTypesCol = [];
                } else {
                    $scope.eventTypesCol.splice(target, 1);
                }

                    var parent = document.getElementsByTagName("body")[0],
                        child = parent.lastChild;

                    parent.removeChild(child);


                LoudService.save("LoudApp__EventTypes", $scope.eventTypesCol);

                $location.path('/eventTypesList');
            }

        };

        $scope.$watch('eventTypesCol', function(newValue, oldValue) {
            LoudService.save("LoudApp__EventTypes", newValue);
        }, true);

        $scope.init();
	}
])