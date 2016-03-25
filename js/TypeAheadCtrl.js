
angular.module ('loudApp.controllers')

.controller('TypeaheadCtrl', [
  '$scope',
  function($scope) {

    var _selected;
    $scope.selected = undefined;

    $scope.ngModelOptionsSelected = function(value) {
      if (arguments.length) {
        _selected = value;
      } else {
        return _selected;
      }
    };

    $scope.modelOptions = {
      debounce: {
        default: 500,
        blur: 250
      },
      getterSetter: true
    };

    $scope.eventName = [{'name':'Iron Maiden'},{'name':'Foo Fighters'},{'name':'Batman VS Super Man'}];
  }
])