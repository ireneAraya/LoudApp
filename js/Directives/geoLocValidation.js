angular.module ('loudApp.directives')

.directive('validGeol', function () {
     
    return {
        require: 'ngModel',
            link: function(scope, elm, attrs, ctrl){
                var regex = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;
                var validator = function(value){
                    ctrl.$setValidity('validGeol', regex.test(value));
                    return value;
                };
                
                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.unshift(validator);
            }
    };
                     
});