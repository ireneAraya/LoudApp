angular.module ('loudApp.controllers')

.controller('EventsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout', '$q',
	function($scope, $routeParams, $location, LoudService, $timeout, $q) {

        $scope.init = function() {

            $scope.eventsCol = [];
            $scope.locations = [];
            $scope.loadingData = true;

            $scope.locationsCol = LoudService.verify('LoudApp__Locations') || {};
            $scope.eventTypesCol = LoudService.verify('LoudApp__EventTypes') || {};
            $scope.zonesCol = LoudService.verify('LoudApp__Zones') || {};

            var getEvents = $q(function (resolve, reject) {
                var res = LoudService.getCollection("events");

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            getEvents.then(function (response) {
                if (response && response.data) {
                    $scope.eventsCol = response.data;

                    var getLocations = $q(function (resolve, reject) {
                        var res = LoudService.getCollection("locations");

                        $timeout(
                            function() {
                                resolve(res)
                            }, Math.random() * 2000 + 1000);
                    });

                    getLocations.then(function (responseLocations) {
                        if (responseLocations && responseLocations.data) {
                            $scope.locations = responseLocations.data;

                            for (var i = 0; i < $scope.eventsCol.length; i++) {
                                var event = $scope.eventsCol[i];
                                event.locationName = LoudService.getItem($scope.locations, "id", event.locationId)["name"];
                                event.geolocation = LoudService.getItem($scope.locations, "id", event.locationId)["geolocation"];
                            }

                            if ($routeParams.id) {
                                var targetEvent = LoudService.getItemIndex($scope.eventsCol, $routeParams.id);

                                $scope.event = $scope.eventsCol[targetEvent];

                                console.log($scope.event);
                            }

                            $scope.loadingData = false;
                        }
                    });
                }
            });
        };

            //Agregar inputs de precio y lugar
            $scope.zonesCol = [
                { id    : 0}
            ];

            $scope.addZone = function () {
                var newZone = $scope.zonesCol.length+1;
                var newId = 0;

                for (var i = 0; i < $scope.zonesCol.length; i++) {
                    newId = (i +1);
                };

                var zone = {
                    id      : newId,
                    place   : $scope.place,
                    amount  : $scope.amount
                }

                $scope.zonesCol.push(zone);

                LoudService.save("LoudApp__Zones", $scope.zonesCol);
            };

            $scope.deleteZone = function () {
                var lastZoneItem = $scope.zonesCol.length-1;
                $scope.zonesCol.splice(lastZoneItem, 1);
            };

            //Seleccionar el valor del typeahead
            $scope.getSelectedLocation = function (value) {
                $scope.location = value;
            };

            $scope.getSelectedType = function (value) {
                $scope.eventType = value;
            };

            //Agregar Evento
            $scope.addEvent = function () {
                var lastID = 0;

                for (var i = 0; i < $scope.eventsCol.length; i++) {
                    lastID = (i +1);
                };

                //crea el objeto y lo agrega a la colección
                var event = {
                    id              : lastID,
                    image           : document.getElementById("eventImage").getAttribute("src"),
                    name            : $scope.eventName,
                    date            : document.getElementById("selectedDate").value,
                    startHour       : $scope.startHour,
                    location        : $scope.location.id,
                    eventType       : $scope.eventType.id,
                    description     : $scope.description,
                    prices          : $scope.zonesCol
                }
                $scope.eventsCol.push(event);

                console.log($scope.eventsCol);
                console.log($scope.zonesCol);

                // Limpia el formulario, tanto en valores como en estado de variables
                if ($scope.addLocationForm) {
                  $scope.addLocationForm.$setPristine();
                  $scope.addLocationForm.$setUntouched();
                  $scope.event = "";
                  $scope.date = "";
                  $scope.startHour = "";
                  $scope.location = "";
                  $scope.eventType = "";
                  $scope.description = "";
                  $scope.place = "";
                  $scope.amount = "";
                }

                $location.path('/eventsList');
            }

            //Borrar evento
            $scope.erraseEvent = function ($index) {
                var target = LoudService.getItemIndex($scope.eventsCol, $index);

                if ($scope.eventsCol.length == 1) {
                    $scope.eventsCol = [];
                } else {
                    $scope.eventsCol.splice(target, 1);
                }

                // $timeout(function () {
                    var parent = document.getElementsByTagName("body")[0],
                        child = parent.lastChild;

                    parent.removeChild(child);
                // }, 1000);


                LoudService.save("LoudApp__Events", $scope.eventsCol);

                $location.path('/eventsList');
            }

        // };

        $scope.init();
	}
])