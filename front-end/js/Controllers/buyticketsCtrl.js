angular.module ('loudApp.controllers')

.controller('buyticketsCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService', '$filter',
    function($scope, $routeParams, $location, LoudService, $filter) {

        $scope.eventsBuy = LoudService.verify('LoudApp__SelectedEventInfo') || {};
        var options = [];

        $scope.initialAmount = 0;
        $scope.itemPrice = 3500;

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };

        $scope.sumValues = function () {
            $scope.initialAmount += $scope.itemPrice;
        }

        $scope.differenceValues = function () {
            $scope.initialAmount -= $scope.itemPrice;

            // No deja que de resultados negativos
            if ($scope.initialAmount <= 0) {
                $scope.initialAmount = 0;
            }
        }

        function otherFunctions() {
            var areaAndSeats = {};
            areaAndSeats.area = "";
            areaAndSeats.seats = [];

            $scope.getSelectedValue = function (value) {
                $scope.eventsBuy = value;
                // LoudService.save("LoudApp__SelectedEventInfo", $scope.eventsBuy);
            };

            $scope.getEventLocation = function (index, key) {
                var location = LoudService.getItem($scope.data.locations, "id", index);
                return location[key];
            };

            $scope.getAreaValue = function (item) {
                areaAndSeats.area = item.currentTarget.getAttribute("data-description");
            };

            $scope.getSeatNumber = function (item) {
                areaAndSeats.seats.push(item.currentTarget.getAttribute("data-description"));
            };

            $scope.buyButon = function () {
                // Comprobar que haya por lo menos un area y por lo menos
                // un asiento
                // if () {
                    console.log(areaAndSeats);
                    $scope.eventsBuy.options = [];
                    $scope.eventsBuy.options.push(areaAndSeats);
                    areaAndSeats = {};
                    areaAndSeats.area = "";
                    areaAndSeats.seats = [];
                // } else {
                    // alert("Seleccione por lo menos un asiento");
                // }

                console.log($scope.eventsBuy.options);
            }
        };

        $scope.init();

        $scope.$watch('eventsBuy', function(newValue, oldValue) {
            LoudService.save("LoudApp__SelectedEventInfo", newValue);
        }, true);

    }
]);