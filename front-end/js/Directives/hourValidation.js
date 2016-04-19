angular.module ('loudApp.directives')

.directive('validHour', function () {
     
    return {
        require: 'ngModel',
            link: function(scope, elm, attrs, ctrl){
                var regex = /^([0]?[1-9]|1[0-2]):([0-5]\d)\s?(am|pm)$/;
                var validator = function(value){
                    ctrl.$setValidity('validHour', regex.test(value));
                    return value;
                };
                
                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.unshift(validator);
            }
    };
                     
});