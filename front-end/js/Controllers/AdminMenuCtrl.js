angular.module ('loudApp.controllers')

.controller('AdminMenuCtrl',['$scope', 'LoudService',
function ($scope, LoudService){
    $scope.init = function () {
        $scope.isAdmin = false;
        $scope.user = LoudService.verify("LoudApp__User");

        if ($scope.user && $scope.user.rol) {
            $scope.isAdmin = true;
        }
    };

    $scope.init();
}]);