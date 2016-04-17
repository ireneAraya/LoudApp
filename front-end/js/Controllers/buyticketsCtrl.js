angular.module ('loudApp.controllers')

.controller('buyticketsCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService', '$filter',
    function($scope, $routeParams, $location, LoudService, $filter) {

        $scope.eventsBuy = LoudService.verify('LoudApp__SelectedEventInfo') || {};
        $scope.user = LoudService.verify('LoudApp__User') || {};

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

            var firstName = $scope.user.firstName || $scope.user.first_name;
            var separator = " ";
            var lastName = $scope.user.lastName || $scope.user.last_name;

            var fullName =  firstName + separator + lastName;

            if (fullName == "undefined undefined") {
                $scope.detailUser = " ";
            } else {
                $scope.detailUser = fullName;
            }

            $scope.detailEmail = $scope.user.email || "";

            var areaAndSeats = {};
            areaAndSeats.area = "";
            areaAndSeats.seats = [];

            $scope.getSelectedValue = function (value) {
                $scope.eventsBuy = value;
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
                $scope._option = LoudService.verify("LoudApp__SelectedOptions") || [];
                $scope._option.push(areaAndSeats);

                LoudService.save("LoudApp__SelectedOptions", $scope._option);
                $scope.eventsBuy.options = $scope._option;
                LoudService.remove("LoudApp__SelectedOptions");

                areaAndSeats = {};
                areaAndSeats.area = "";
                areaAndSeats.seats = [];
            }
        };

        $scope.init();

        $scope.$watch('eventsBuy', function(newValue, oldValue) {
            LoudService.save("LoudApp__SelectedEventInfo", newValue);
        }, true);

    }
]);