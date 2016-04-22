angular.module ('loudApp.controllers')

.controller('TypeaheadCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService',
    function($scope, $routeParams, $location, LoudService) {
      // $scope.locationsCol = LoudService.verify('LoudApp__Locations') || {};
      // $scope.eventTypesCol = LoudService.verify('LoudApp__EventTypes') || {};
      // $scope.usersCol = LoudService.verify('LoudApp__Users') || {};

      // LoudService.getDataFromJS().then(function(response) {
      //     $scope.data = angular.fromJson(response.data);
      //     otherFunctions();
      // }, function(razon) {
      //     $scope.error = razon;
      // });
      //
      $scope.init = function () {
        // $scope.locationsCol = LoudService.verify('LoudApp__Locations') || {};
        // $scope.eventTypesCol = LoudService.verify('LoudApp__EventTypes') || {};
        // $scope.usersCol = LoudService.verify('LoudApp__Users') || {};
        $scope.locationsCol = {};
        $scope.eventTypesCol = {};
        $scope.usersCol = {};
        $scope.loadingData = true;

        var getEvents = $q(function (resolve, reject) {
            var res = LoudService.getCollection("events");

            $timeout(
                function() {
                    resolve(res)
                }, Math.random() * 2000 + 1000);
        });

        getEvents.then(function (response) {
          console.log(response.data);

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
                        $scope.locationsCol = responseLocations.data;

                        var getEventTypes = $q(function (resolve, reject) {
                            var res = LoudService.getCollection("eventTypes");

                            $timeout(
                                function() {
                                    resolve(res)
                                }, Math.random() * 2000 + 1000);
                        });

                        getEventTypes.then(function (responseEventTypes) {
                          if (responseEventTypes && responseEventTypes.data) {
                            $scope.eventTypesCol = responseEventTypes.data;
                          }

                          for (var i = 0; i < $scope.events.length; i++) {
                              var event = $scope.events[i];
                              event.locationName = LoudService.getItem($scope.locationsCol, "id", event.locationId)["name"];
                              event.geolocation = LoudService.getItem($scope.locationsCol, "id", event.locationId)["geolocation"];
                              event.typeName = LoudService.getItem($scope.eventTypesCol, "id", event.id)["name"];
                              event.date = new Date(event.date).toISOString();
                          }
                        });

                        $scope.loadingData = false;
                    }
                });
            }
        });
      }

      // function otherFunctions () {

      $scope.modelOptions = {
        debounce: {
          default: 500,
          blur: 250
        },
        getterSetter: true
      };

      // }
  }
])