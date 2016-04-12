angular.module ('loudApp.controllers')

.controller('buyticketsCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService', '$filter',
    function($scope, $routeParams, $location, LoudService, $filter) {

        $scope.eventsBuy = LoudService.verify('LoudApp__SelectedEventInfo') || {};

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

            $scope.getSelectedValue = function (value) {
                $scope.eventsBuy = value;
                LoudService.save("LoudApp__SelectedEventInfo", $scope.eventsBuy);
            };

            $scope.getEventLocation = function (index, key) {
                var location = LoudService.getItem($scope.data.locations, "id", index);
                return location[key];
            };

        };

        $scope.init();

    }
]);