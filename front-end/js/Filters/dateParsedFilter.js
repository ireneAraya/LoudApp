angular.module ('loudApp')

.filter('parsedDate', [function () {
    return function (dateString) {
      if (dateString) {
        dateString = new Date(dateString).toISOString();
      }
    };
}]);