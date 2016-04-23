angular.module ('loudApp.controllers')

.controller('TypeaheadCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService', '$rootScope', '$q', '$timeout',
    function($scope, $routeParams, $location, LoudService, $rootScope, $q, $timeout) {

      $scope.init = function () {
        $scope.locationsCol = {};
        $scope.eventTypesCol = {};
        $scope.usersCol = {};

        var getEvents = $q(function (resolve, reject) {
            var res = LoudService.getCollection("events");

            $timeout(
                function() {
                    resolve(res)
                }, Math.random() * 2000 + 1000);
        });

        getEvents.then(function (response) {
            if (response && response.data) {
                $scope.events = response.data;

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
                            }

                            for (var i = 0; i < $scope.events.length; i++) {
                                var event = $scope.events[i];
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

                            $scope.loadingData = false;
                        });
                    }
                });
            }
        });
      };

      $scope.modelOptions = {
        debounce: {
          default: 500,
          blur: 250
        },
        getterSetter: true
      };

      $scope.init();
  }
])