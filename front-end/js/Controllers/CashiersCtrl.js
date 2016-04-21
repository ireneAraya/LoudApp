angular.module ('loudApp.controllers')

.controller('CashiersCtrl', [
    '$scope', 'LoudService', '$location', '$q', '$timeout',
    function($scope, LoudService, $location, $q, $timeout) {

        $scope.init = function() {
            $scope.emailSent = false;
            $scope.user = {};

            var userExists = $q(function (resolve, reject) {
                var res = LoudService.verifyUser();

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            userExists.then(function (response) {
                if (response.success && response.data) {
                    $location.path("/");
                } else {
                    // Calbacks
                    otherFunctions();
                }
            });
        };

        $scope.addCashier = function () {
            // Disables the register button while processing
            $scope.processing = true;
            $scope.error = null;

            // Creates the user object
            var userToCreate = {
                "rol" : 4,
                "identification" : $scope.user.identification,
                "identificationType" : $scope.user.identificationType,
                "firstName" : $scope.user.firstName,
                "middleName" : $scope.user.middleName,
                "lastName" : $scope.user.lastName,
                "secondSurname" : $scope.user.secondSurname,
                "email" : $scope.user.email,
                "salesPoint": $scope.user.salesPoint,
                "hash" : $scope.user.hash,
                "verifyPassword" : $scope.user.verifyPassword,
                "phone" : $scope.user.phone,
                "locale" : "EN",
                "photoURL" : document.getElementById("cashierImage").getAttribute("src")
            };

            console.log(userToCreate);

            // Creates a promise to call the user Service
            var createUserServiceFunction = $q(function (resolve, reject) {
                var res = LoudService.registerUser(userToCreate);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            createUserServiceFunction.then(function (response) {
                console.log(response);

                if (response.success) {
                    $scope.processing = false;
                    $scope.error = null;
                    $scope.emailSent = true;
                } else {
                    $scope.processing = false;
                    $scope.error = response.message;
                }
            });
        };

        function otherFunctions () {
        };

        $scope.init();
    }
]);