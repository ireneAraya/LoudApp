angular.module ('loudApp.controllers')

.controller('buyticketsCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService', '$filter',
    function($scope, $routeParams, $location, LoudService, $filter) {

        $scope.eventsBuy = LoudService.verify('LoudApp__SelectedEventInfo') || {};
        $scope.user = LoudService.verify('LoudApp__User') || {};
        $scope.areaName = '';

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });

            LoudService.getSeatDataFromJS().then(function(response) {
                $scope.sections = response.data;
            }, function(razon) {
                $scope.error = razon;
            });
        };

        function otherFunctions() {

            var firstName = $scope.user.firstName || $scope.user.first_name;
            var separator = " ";
            var lastName = $scope.user.lastName || $scope.user.last_name;

            var fullName =  firstName + separator + lastName;

            if (fullName == "undefined undefined") {
                $scope.detailUser = " ";
            } else {
                $scope.detailUser = fullName;
            }

            $scope.detailEmail = $scope.user.email || "";

            var areaAndSeats = [];
            var fullOption = {};
            fullOption.seats = [];
            $scope.price = 0;

            $scope.getSelectedValue = function (value) {
                $scope.eventsBuy = value;
            };

            $scope.showLocationView = function () {

                var locationID = $scope.eventsBuy.locationId;
                var locationPath = '';

                if (locationID == 1) {
                    // Estadio Nacional
                    locationPath = '/buyTickets/tickets/seats';
                } else if (locationID == 2) {
                    // Saprissa
                    locationPath = '/buyTickets/tickets/seats';
                } else if (locationID == 3) {
                    // Peppers
                    locationPath = '/addEvent';
                }

                $location.path( locationPath );
            }

            $scope.getAreaValue = function (item) {
                fullOption.area = "";
                fullOption.area = item.currentTarget.getAttribute("data-description");
                $scope.areaName = fullOption.area;
                var areaString = fullOption.area;

                var areaResult = areaString.substring(0, 3);

                var areaResultOthers = areaString.charAt(0);

                if (areaResult == "VIP") {
                    $scope.price = Number($scope.eventsBuy.rates[2].price);
                } else if (areaResultOthers == "F" | areaResultOthers == "E" | areaResultOthers == "S" ) {
                    $scope.price = Number($scope.eventsBuy.rates[0].price);
                }

            };

            $scope.getSeatNumber = function (item) {

                fullOption.total = 0;

                var array = fullOption.seats || [];

                fullOption.seats.push(item.currentTarget.getAttribute("data-description"));

                var cantSeats = fullOption.seats.length;

                function getTotalSum () {
                    fullOption.total = cantSeats * $scope.price;
                }
                getTotalSum();
            };

            // Select seats and add selected class
            $scope.toogleSelectedSeat = function(section) {
                if (section.isSeatSelected) {
                    section.isSeatSelected = false;
                } else {
                    section.isSeatSelected = true;
                }
            }

            $scope.isSeatSelected = function(section) {
                return $scope.selected === section;
            }

            $scope.buyButon = function () {
                areaAndSeats = areaAndSeats || LoudService.verify("LoudApp__SelectedOptions");
                areaAndSeats.push(fullOption);

                LoudService.save("LoudApp__SelectedOptions", areaAndSeats);
                $scope.eventsBuy.options = areaAndSeats;
                LoudService.remove("LoudApp__SelectedOptions");

                fullOption = {};
                fullOption.seats = [];
            };

            //Next-buttons
            $scope.go = function ( path ) {
                $location.path( path );
            };
        };

        $scope.init();

        $scope.$watch('eventsBuy', function(newValue, oldValue) {
            LoudService.save("LoudApp__SelectedEventInfo", newValue);
        }, true);
    }
]);