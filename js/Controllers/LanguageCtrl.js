angular.module ('loudApp.controllers')

.controller('languageCtrl',['$scope', 'translationService',
function ($scope, translationService){
    $scope.selectedLanguage = "es";
  //Run translation if selected language changes
    $scope.translate = function(a,b,c){
        var selectedLanguageC = $scope.selectedLanguage;

        var promise = translationService.getTranslation(a);

        promise.then(function(response) {
            $scope.translation = response;
        }, function(response) {
            $scope.translation = null;
        });

    };
   //Init
   $scope.translate();
}]);