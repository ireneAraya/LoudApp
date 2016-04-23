angular.module ('loudApp.controllers')

.controller('EventsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout', '$q', '$window',
	function($scope, $routeParams, $location, LoudService, $timeout, $q, $window) {

        $scope.init = function() {

            $scope.eventsCol = [];
            $scope.locations = [];
            $scope.loadingData = true;

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

                            var getPlaces = $q(function (resolve, reject) {
                                var res = LoudService.getCollection("price_places");

                                $timeout(
                                    function() {
                                        resolve(res)
                                    }, Math.random() * 2000 + 1000);
                            });

                            getPlaces.then(function (responsePlaces) {
                                if (responsePlaces && responsePlaces.data) {
                                    $scope.rates = responsePlaces.data;

                                    for (var i = 0; i < $scope.eventsCol.length; i++) {
                                        var event = $scope.eventsCol[i];
                                        event.locationName = LoudService.getItem($scope.locations, "id", event.locationId)["name"];
                                        event.geolocation = LoudService.getItem($scope.locations, "id", event.locationId)["geolocation"];
                                        event.date = new Date(event.date).toISOString();

                                        var rates = [];

                                        for (var f = 0; f < $scope.rates.length; f++) {
                                            var rate = $scope.rates[f];

                                            if (rate.eventId == event.id) {
                                                rates.push(rate);
                                            }
                                        }

                                        event.rates = rates;
                                    }

                                    if ($routeParams.id) {
                                        var targetEvent = LoudService.getItemIndex($scope.eventsCol, $routeParams.id);
                                        $scope.event = $scope.eventsCol[targetEvent];
                                    }
                                }


                                $scope.loadingData = false;
                            });
                        }
                    });
                }
            });
        };


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
        $scope.erraseEvent = function (eventId) {
            var deleteEvent = $q(function (resolve, reject) {
                var res = LoudService.deleteItem("events", eventId);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            deleteEvent.then(function (response) {
                if (response && response.success) {
                    $window.location.reload();
                }
            });
        }

        $scope.init();
	}
])