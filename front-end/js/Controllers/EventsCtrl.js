angular.module ('loudApp.controllers')

.controller('EventsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout',
	function($scope, $routeParams, $location, LoudService, $timeout) {
        $scope.eventsCol = LoudService.verify('LoudApp__Events') || {};
        $scope.locationsCol = LoudService.verify('LoudApp__Locations') || {};
        $scope.eventTypesCol = LoudService.verify('LoudApp__EventTypes') || {};
 
        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };


        function otherFunctions () {
            //$scope.eventsCol = $scope.data.events;

            $scope.getEventLocation = function (index, key) {
                // Se repiten los llamados
                // console.log(index);
                var location = LoudService.getItem($scope.data.locations, "id", index);
                return location[key];
            };

            // Editar Imagen
            if ($routeParams.id) {
                var currentID = $routeParams.id;
                $scope.event = LoudService.getItem($scope.eventsCol, "id", currentID);

                $scope.imageSource = $scope.event.image;

                $scope.fileNameChanged = function (element) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function() {
                            $scope.imageSource = e.target.result;
                        });
                    }
                    reader.readAsDataURL(element.files[0]);
                }
            };

            //Agregar Imagen
            $scope.newImageSource = '';

            $scope.newImage = function (element) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $scope.$apply(function() {
                        $scope.newImageSource = e.target.result;
                    });
                }
                reader.readAsDataURL(element.files[0]);
            }

            //Agregar inputs de precio y lugar
            $scope.priceInputs = [ { id:'priceInput1' } ];

            $scope.addPriceInputs = function () {
                var newPriceInput = $scope.priceInputs.length+1;
                $scope.priceInputs.push({'id':'priceInput'+ newPriceInput});
            }

            //Seleccionar el valor del typeahead
            $scope.getSelectedLocation = function (value) {
                $scope.newLocation = value;
            };

            $scope.getSelectedType = function (value) {
                $scope.newEventType = value;
            };

            //Agregar Evento
            $scope.addEvent = function () {
                $scope.today = new Date();

                var lastID = 0;

                for (var i = 0; i < $scope.eventsCol.length; i++) {
                    lastID = (i +1);
                };

                var zonesCol = [];
                
                var pricesObj = {
                    place   : $scope.newPlace, 
                    amount  : $scope.newPrice
                };

                zonesCol.push(pricesObj);

                //crea el objeto y lo agrega a la colección
                var event = {
                    id              : lastID,
                    image           : $scope.newImageSource,
                    name            : $scope.newEvent,
                    date            : $scope.newDate,
                    startHour       : $scope.newStartHour,
                    location        : $scope.newLocation.id,
                    eventType       : $scope.newEventType.id,
                    description     : $scope.newDescription,
                    prices          : zonesCol
                }
                $scope.eventsCol.push(event);

                console.table($scope.eventsCol);
                console.table(zonesCol);
                console.log($scope.newDate);

                // Limpia el formulario, tanto en valores como en estado de variables
                if ($scope.addLocationForm) {
                  $scope.addLocationForm.$setPristine();
                  $scope.addLocationForm.$setUntouched();
                  $scope.newImageSource = "";
                  $scope.newEvent = "";
                  $scope.newDate = "";
                  $scope.newStartHour = "";
                  $scope.newLocation = "";
                  $scope.newEventType = "";
                  $scope.newPlace = "";
                  $scope.newPrice = "";
                }
                
                $location.path('/eventsList');
            }

            //Borrar evento
            $scope.erraseEvent = function ($index) {
                var target = LoudService.getItemIndex($scope.eventsCol, $index);

                if ($scope.eventsCol.length == 1) {
                    $scope.eventsCol = [];
                } else {
                    $scope.eventsCol.splice(target, 1);
                }

                // $timeout(function () {
                    var parent = document.getElementsByTagName("body")[0],
                        child = parent.lastChild;

                    parent.removeChild(child);
                // }, 1000);


                LoudService.save("LoudApp__Events", $scope.eventsCol);

                $location.path('/eventsList');
            }

        };

        $scope.$watch('eventsCol', function(newValue, oldValue) {
            LoudService.save("LoudApp__Events", newValue);
        }, true);

        $scope.init();
	}
])