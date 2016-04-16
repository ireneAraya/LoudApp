angular.module ('loudApp.directives')

.directive('validEmail', function () {
     
    return {
        require: 'ngModel',
            link: function(scope, elm, attrs, ctrl){
                var regex = /.+\@.+\..+/;
                var validator = function(value){
                    ctrl.$setValidity('validEmail', regex.test(value));
                    return value;
                };
                
                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.unshift(validator);
            }
    };
                     
});