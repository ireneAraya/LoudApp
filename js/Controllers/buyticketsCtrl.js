angular.module ('loudApp.controllers')

.controller('buyticketsCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService',
    function($scope, $routeParams, $location, LoudService) {

        $scope.initialAmount = 0;
        $scope.itemPrice = 35000;

        $scope.sumValues = function () {
            $scope.initialAmount += $scope.itemPrice;
        }

        $scope.differenceValues = function () {
            $scope.initialAmount -= $scope.itemPrice;
        }

        $scope.getSelectedValue = function (value) {
          console.log(value.id);
        }
    }
]);