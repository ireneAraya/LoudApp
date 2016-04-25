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

                var getPrices = $q(function (resolve, reject) {
                    var res = LoudService.getCollection("price_places");

                    $timeout(
                        function() {
                            resolve(res)
                        }, Math.random() * 2000 + 1000);
                });

                getPrices.then(function (responseRates) {
                    if (responseRates && responseRates.data) {
                        $scope.rates = responseRates.data;

                        for (var i = 0; i < $scope.events.length; i++) {
                            var event = $scope.events[i];

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
                            var targetEvent = LoudService.getItemIndex($scope.events, $routeParams.id);
                            $scope.event = $scope.events[targetEvent];
                        }
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