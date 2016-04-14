angular.module ('loudApp.directives')

.directive('validNumber', function () {
     
    return {
        require: 'ngModel',
            link: function(scope, elm, attrs, ctrl){
                var regex = /\(?([0-9]{4})\)?([-]{1})([0-9]{4})/;
                var validator = function(value){
                    ctrl.$setValidity('validNumber', regex.test(value));
                    return value;
                };
                
                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.unshift(validator);
            }
    };
                     
});