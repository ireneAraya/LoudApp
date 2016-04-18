angular.module ('loudApp.directives')

.directive('validPassword', function () {

    return {
        require: 'ngModel',
            link: function(scope, elm, attrs, ctrl){
                var validator = function(value){
                    var minLength = 8;

                    var val = value || "";

                    if (val.length < minLength) {
                        ctrl.$setValidity('validPassword', false);
                        return value;
                    } else {
                        ctrl.$setValidity('validPassword', true);
                        return value;
                    }

                };

                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.unshift(validator);
            }
    };

});