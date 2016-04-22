angular.module ('loudApp.directives')

.directive('validPassword', function () {

    return {
        require: 'ngModel',
            link: function(scope, elm, attrs, ctrl){
                var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$^*()_+=[\]{}|\\//,.?:-<>])[A-Za-z\d@#$^*()_+=[\]{}|\\//,.?:-<>]{8,}$/;
                var validator = function(value){
                    ctrl.$setValidity('validPassword', regex.test(value));
                    return value;
                };

                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.unshift(validator);
            }
    };

});