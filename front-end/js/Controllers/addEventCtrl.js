angular.module ('loudApp.controllers')

.controller('addEventCtrl',['$scope', 'LoudService', '$q', '$window', '$timeout',
function ($scope, LoudService, $q, $window, $timeout) {
    $scope.init = function () {
        $scope.event = {};
        $scope.zonesCol = [{id:0}];
    };

    $scope.addZone = function () {
        var zone = {
            place   : $scope.place,
            amount  : $scope.amount
        }

        $scope.zonesCol.push(zone);

        LoudService.save("LoudApp__Zones", $scope.zonesCol);
    };

    $scope.deleteZone = function () {
        var lastZoneItem = $scope.zonesCol.length-1;
        $scope.zonesCol.splice(lastZoneItem, 1);
    };

    //Seleccionar el valor del typeahead
    $scope.getSelectedLocation = function (value) {
        $scope.location = value;
    };

    $scope.getSelectedType = function (value) {
        $scope.eventType = value;
    };

    //Agregar Evento
    $scope.addEvent = function () {
        //crea el objeto y lo agrega a la colección
        var eventToCreate = {
            image           : document.getElementById("eventImage").getAttribute("src"),
            name            : $scope.eventName,
            date            : document.getElementById("selectedDate").value,
            startHour       : $scope.startHour,
            location        : $scope.location.id,
            eventType       : $scope.eventType.id,
            description     : $scope.description,
        }

        console.log(eventToCreate);
    }

    $scope.init();

    $scope.$watch('zonesCol', function(newValue, oldValue) {
        LoudService.save("LoudApp__Zones", newValue);
    }, true);
}]);