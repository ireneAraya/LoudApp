angular.module ('loudApp.directives')

.directive('localId', function () {
     
    return {
        require: 'ngModel',
            link: function(scope, elm, attrs, ctrl){
                var regex = /([1-9]{1}[0]{1}[0-9]{4}[0]{1}[0-9]{3})/;
                var validator = function(value){
                    ctrl.$setValidity('localId', regex.test(value));
                    return value;
                };
                
                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.unshift(validator);
            }
    };
                     
});

