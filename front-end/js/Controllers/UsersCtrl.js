angular.module ('loudApp.controllers')

.controller('UsersCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout',
	function($scope, $routeParams, $location, LoudService, $timeout) {
        $scope.eventsCol = LoudService.verify('LoudApp__Events') || {};
        

        // $scope.init = function() {
        //     LoudService.getDataFromJS().then(function(response) {
        //         $scope.data = angular.fromJson(response.data);
        //         otherFunctions();
        //     }, function(razon) {
        //         $scope.error = razon;
        //     });
        // };


        // function otherFunctions () {
        //     //$scope.eventsCol = $scope.data.events;

        //     $scope.getEventLocation = function (index, key) {
        //         // Se repiten los llamados
        //         // console.log(index);
        //         var location = LoudService.getItem($scope.data.locations, "id", index);
        //         return location[key];
        //     };

        //     //Agregar inputs de precio y lugar
        //     $scope.zonesCol = [
        //         { id    : 0}
        //     ];

        //     $scope.addZone = function () {
        //         var newZone = $scope.zonesCol.length+1;
        //         var newId = 0;

        //         for (var i = 0; i < $scope.zonesCol.length; i++) {
        //             newId = (i +1);
        //         };

        //         var zone = {
        //             id      : newId,
        //             place   : $scope.place,
        //             amount  : $scope.amount
        //         }

        //         $scope.zonesCol.push(zone);

        //         LoudService.save("LoudApp__Zones", $scope.zonesCol);
        //     };

        //     $scope.deleteZone = function () {
        //         var lastZoneItem = $scope.zonesCol.length-1;
        //         $scope.zonesCol.splice(lastZoneItem, 1);
        //     };

        //     //Seleccionar el valor del typeahead
        //     $scope.getSelectedLocation = function (value) {
        //         $scope.location = value;
        //     };

        //     $scope.getSelectedType = function (value) {
        //         $scope.eventType = value;
        //     };

        //     //Agregar Evento
        //     $scope.addEvent = function () {
        //         var lastID = 0;

        //         for (var i = 0; i < $scope.eventsCol.length; i++) {
        //             lastID = (i +1);
        //         };

        //         //crea el objeto y lo agrega a la colección
        //         var event = {
        //             id              : lastID,
        //             image           : document.getElementById("eventImage").getAttribute("src"),
        //             name            : $scope.eventName,
        //             date            : document.getElementById("selectedDate").value,
        //             startHour       : $scope.startHour,
        //             location        : $scope.location.id,
        //             eventType       : $scope.eventType.id,
        //             description     : $scope.description,
        //             prices          : $scope.zonesCol
        //         }
        //         $scope.eventsCol.push(event);

        //         console.log($scope.eventsCol);
        //         console.log($scope.zonesCol);

        //         // Limpia el formulario, tanto en valores como en estado de variables
        //         if ($scope.addLocationForm) {
        //           $scope.addLocationForm.$setPristine();
        //           $scope.addLocationForm.$setUntouched();
        //           $scope.event = "";
        //           $scope.date = "";
        //           $scope.startHour = "";
        //           $scope.location = "";
        //           $scope.eventType = "";
        //           $scope.description = "";
        //           $scope.place = "";
        //           $scope.amount = "";
        //         }

        //         $location.path('/eventsList');
        //     }

        //     //Borrar evento
        //     $scope.erraseEvent = function ($index) {
        //         var target = LoudService.getItemIndex($scope.eventsCol, $index);

        //         if ($scope.eventsCol.length == 1) {
        //             $scope.eventsCol = [];
        //         } else {
        //             $scope.eventsCol.splice(target, 1);
        //         }

        //         // $timeout(function () {
        //             var parent = document.getElementsByTagName("body")[0],
        //                 child = parent.lastChild;

        //             parent.removeChild(child);
        //         // }, 1000);


        //         LoudService.save("LoudApp__Events", $scope.eventsCol);

        //         $location.path('/eventsList');
        //     }

        // };

        // $scope.$watch('eventsCol', function(newValue, oldValue) {
        //     LoudService.save("LoudApp__Events", newValue);
        // }, true);

        // $scope.$watch('zonesCol', function(newValue, oldValue) {
        //     LoudService.save("LoudApp__Zones", newValue);
        // }, true);

        // $scope.init();
	}
])