angular.module ('loudApp.controllers')

.controller('buyticketsCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService',
    function($scope, $routeParams, $location, LoudService) {

        $scope.initialAmount = 0;
        $scope.itemPrice = 3500;

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

        $scope.getSelectedValue = function (value) {
          console.log(value.id);
        }
    }
]);