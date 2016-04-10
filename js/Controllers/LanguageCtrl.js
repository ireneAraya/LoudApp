angular.module ('loudApp.controllers')

.controller('languageCtrl',['$scope', 'translationService', 'LoudService',
function ($scope, translationService, LoudService){

    // var localStorageKey = "LoudApp__Language";

    // $scope.selectedLanguage = "es";

    // Se saca el valor primero del localStorage y si no está, se define como español
    $scope.selectedLanguage = LoudService.verify("LoudApp__Language") || "es";

  //Run translation if selected language changes
    $scope.translate = function(a,b,c) {

        // Se lee el valor de a (que es cuando se cambia en el select la opción)
        // pero al primer llamado da undefined (porque no se ha tocado el select)
        // entonces se le pone selectedLanguage que ya tiene algo.
        //
        // También permite que se guarde el lenguaje que se escogió, aunque se refresque
        var lang = a || $scope.selectedLanguage;

        var promise = translationService.getTranslation(lang);

        LoudService.save("LoudApp__Language", lang);

        promise.then(function(response) {
            $scope.translation = response;
        }, function(response) {
            $scope.translation = null;
        });
    };

   //Init
   $scope.translate();
}]);