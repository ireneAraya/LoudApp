angular.module ('loudApp.controllers')

.controller('languageCtrl',['$scope', 'translationService', 'LoudService',
function ($scope, translationService, LoudService){

    var localStorageKey = "LoudApp__Language";

    $scope.selectedLanguage = "es";

    $scope.selectedLanguage = LoudService.verify(localStorageKey) || [];

  //Run translation if selected language changes
    $scope.translate = function(a,b,c) {

        var promise = translationService.getTranslation(a);

        LoudService.save(localStorageKey, a);

        var value = LoudService.getItem(localStorageKey);

        console.log(value);

        promise.then(function(response) {
            $scope.translation = response;
        }, function(response) {
            $scope.translation = null;
        });
    };

   //Init
   $scope.translate();
}]);