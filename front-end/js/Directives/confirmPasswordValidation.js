angular.module ('loudApp.directives')

.directive('compareTo', function () {
     
    return {
        require: 'ngModel',
        scope: {
          otherModelValue: "=compareTo"
        },
            link: function(scope, elm, attrs, ngModel){
                ngModel.$validators.compareTo = function(modelValue) {
                  return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                  ngModel.$validate();
                });
            }
    };
                     
});