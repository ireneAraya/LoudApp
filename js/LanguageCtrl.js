angular.module ('loudApp.controllers')


.controller('myController',['$scope', 'translationService',
function ($scope, translationService){

  //Run translation if selected language changes
  $scope.translate = function(){
       translationService.getTranslation($scope, $scope.selectedLanguage);
   };

   //Init
   $scope.selectedLanguage = 'es';
   $scope.translate();

}]);