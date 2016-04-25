angular.module ('loudApp.controllers')

.controller('RegisterCtrl', [
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
                if (response && response.success && response.data) {
                    $location.path("/profile");
                }
            });
        };

        $scope.signUp = function () {
            // Disables the register button while processing
            $scope.processing = true;
            $scope.error = null;

            // Creates the user object
            var userToCreate = {
                "identification" : $scope.user.identification,
                "identificationType" : $scope.user.identificationType,
                "firstName" : $scope.user.firstName,
                "middleName" : $scope.user.middleName,
                "lastName" : $scope.user.lastName,
                "secondSurname" : $scope.user.secondSurname,
                "nickname" : $scope.user.nickname,
                "email" : $scope.user.email,
                "hash" : $scope.user.hash,
                "verifyPassword" : $scope.user.verifyPassword,
                "birthDate" :  document.getElementById("selectedDate").value,
                "phone" : $scope.user.phone,
                "gender" : $scope.user.gender,
                "disability" : $scope.user.disability,
                "specialCondition" : $scope.user.specialCondition,
                "locale" : $scope.user.locale,
                "photoURL" : document.getElementById("userImage").getAttribute("src")
            };

            // Creates a promise to call the user Service
            var createUserServiceFunction = $q(function (resolve, reject) {
                var res = LoudService.registerUser(userToCreate);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            createUserServiceFunction.then(function (response) {
                if (response && response.success) {
                    $scope.processing = false;
                    $scope.error = null;
                    $scope.emailSent = true;
                } else {
                    $scope.processing = false;
                    $scope.error = response.message;
                }
            });
        };

        $scope.init();
    }
]);