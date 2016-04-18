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
                console.log(response);
                if (response.success && response.data) {
                    $location.path("/");
                } else {
                    // Calbacks
                    otherFunctions();
                }
            });
        };

        $scope.signUp = function () {
            // Disables the register button while processing
            $scope.processing = true;
            $scope.error = null;

            // Creates the user object
            var userToCreate = {
                "identification" : $scope.identification,
                "identificationType" : $scope.identificationType,
                "firstName" : $scope.firstName,
                "middleName" : $scope.middleName,
                "lastName" : $scope.lastName,
                "secondSurname" : $scope.secondSurname,
                "nickname" : $scope.nickname,
                "email" : $scope.email,
                "hash" : $scope.hash,
                "verifyPassword" : $scope.verifyPassword,
                "birthDate" :  document.getElementById("selectedDate").value,
                "phone" : $scope.phone,
                "gender" : $scope.gender,
                "disability" : $scope.disability,
                "specialCondition" : $scope.specialCondition,
                "locale" : $scope.locale,
                "photoURL" : document.getElementById("userImage").getAttribute("src")
            };

            console.log(userToCreate);
            console.log($scope.user);

            // Creates a promise to call the user Service
            var createUserServiceFunction = $q(function (resolve, reject) {
                var res = LoudService.registerUser(userToCreate);

                $timeout(
                    function() {
                        resolve(res)
                    }, Math.random() * 2000 + 1000);
            });

            createUserServiceFunction.then(function (response) {
                if (!response.success) {
                    $scope.processing = false;
                    $scope.error = response.message;
                } else {
                    $scope.processing = false;
                    $scope.error = null;
                    $scope.emailSent = true;
                }
            });
        };

        function otherFunctions () {
            console.log('otherFunctions');
        }

        $scope.init();
	}
]);
