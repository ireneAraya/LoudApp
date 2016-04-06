angular.module ('loudApp.directives')

.directive("changePhoto", function(){
  return {
    restrict  : 'E',
    template  : '<input type="file" onchange="newImage()"></input>'
    require   : 'ngModel'
    scope    : {
      ImageSource : '=',
      ngModel     : '=',
      ngChange    : '&'
    },
    link : function(scope, element, attrs){
      scope.newImage = function(image) {
        scope.ngModel = image;
        scope.ngChange({newValue: image});
      }
    }
  };
});