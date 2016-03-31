angular.module ('loudApp.controllers')

.controller('EventsCtrl', [
	'$scope', '$routeParams', '$location', 'LoudService', '$timeout',
	function($scope, $routeParams, $location, LoudService, $timeout) {
        $scope.eventsCol = LoudService.verify("LoudApp__Events") || {};

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
                var location = LoudService.getItem($scope.data.location, "id", index);
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

            //Agregar inputs de precio y lugar
            $scope.priceInputs = [ { id:'priceInput1' } ];

            $scope.addPriceInputs = function () {
                var newPriceInput = $scope.priceInputs.length+1;
                $scope.priceInputs.push({'id':'priceInput'+ newPriceInput});
            }

            //Agregar evento
            $scope.lastID = LoudService.verify("taskLastID") || 0;
            
            $scope.addEvent = function () {
                $scope.lastID++

                //crea el objeto y lo agrega a la colección
                var event = {
                    id          : $scope.lastID,
                    image       : $scope.newImageSource,
                    name        : $scope.newEvent,
                    date        : $scope.newDate,
                    startHour   : $scope.newStartHour,
                    location    : $scope.newLocation,
                    eventType   : $scope.newEventType,
                    description : $scope.newDescription
                }
                $scope.eventsCol.push(event);

                console.table(event);

                // Limpia el formulario, tanto en valores como en estado de variables
                if ($scope.addEventForm) {
                  $scope.addEventForm.$setPristine();
                  $scope.addEventForm.$setUntouched();
                  $scope.newImageSource = "";
                  $scope.newEvent = "";
                  $scope.newDate = "";
                  $scope.newStartHour = "";
                  $scope.newLocation = "";
                  $scope.newEventType = "";
                  $scope.newDescription = "";
                }
            }
        };

        $scope.$watch('eventsCol', function(newValue, oldValue) {
            LoudService.save("LoudApp__Events", newValue);
        }, true);

        $scope.init();
	}
])