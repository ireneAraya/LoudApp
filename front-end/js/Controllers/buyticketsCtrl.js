angular.module ('loudApp.controllers')

.controller('buyticketsCtrl', [
  '$scope', '$routeParams', '$location', 'LoudService', '$filter',
    function($scope, $routeParams, $location, LoudService, $filter) {

        $scope.eventsBuy = LoudService.verify('LoudApp__SelectedEventInfo') || {};
        $scope.user = LoudService.verify('LoudApp__User') || {};
        $scope.areaName = '';

        // $scope.initialAmount = 0;
        // $scope.itemPrice = 3500;

        $scope.init = function() {
            LoudService.getDataFromJS().then(function(response) {
                $scope.data = angular.fromJson(response.data);
                otherFunctions();
            }, function(razon) {
                $scope.error = razon;
            });
        };

        // $scope.sumValues = function () {
        //     $scope.initialAmount += $scope.itemPrice;
        // }

        // $scope.differenceValues = function () {
        //     $scope.initialAmount -= $scope.itemPrice;

        //     // No deja que de resultados negativos
        //     if ($scope.initialAmount <= 0) {
        //         $scope.initialAmount = 0;
        //     }
        // }

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

            $scope.getEventLocation = function (index, key) {
                var location = LoudService.getItem($scope.data.locations, "id", index);
                return location[key];
            };

            $scope.showLocationView = function () {

                var locationID = $scope.eventsBuy.location;
                var locationPath = '';

                if (locationID == 0) {
                    locationPath = '/buyTickets/tickets/seats';
                } else if (locationID == 1) {

                    locationPath = '/buyTickets/tickets/seats';
                } else if (locationID == 2) {
                    locationPath = '/addEvent';
                }

                $location.path( locationPath );
            }

            $scope.getAreaValue = function (item) {
                fullOption.area = "";
                fullOption.area = item.currentTarget.getAttribute("data-description");
                $scope.areaName = fullOption.area;
                console.log($scope.areaName);
                var areaString = fullOption.area;
                var areaResult = areaString.substring(0, 3);
                if (areaResult == "VIP") {
                    $scope.price = $scope.eventsBuy.prices[2].amount;
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

            $scope.sections = [
                {area: 'VIP-2', name: 1, dataAtr: 'A-1', id: 'A', class: 'seat-letter'},
                {area: 'VIP-2', name: 2, dataAtr: 'A-2'},
                {area: 'VIP-2', name: 3, dataAtr: 'A-3'},
                {area: 'VIP-2', name: 4, dataAtr: 'A-4'},
                {area: 'VIP-2', name: 5, dataAtr: 'A-5'},
                {area: 'VIP-2', name: 1, dataAtr: 'B-1', id: 'B', class: 'seat-letter'},
                {area: 'VIP-2', name: 2, dataAtr: 'B-2'},
                {area: 'VIP-2', name: 3, dataAtr: 'B-3'},
                {area: 'VIP-2', name: 4, dataAtr: 'B-4'},
                {area: 'VIP-2', name: 5, dataAtr: 'B-5'},
                {area: 'VIP-2', name: 1, dataAtr: 'C-1', id: 'C', class: 'seat-letter'},
                {area: 'VIP-2', name: 2, dataAtr: 'C-2'},
                {area: 'VIP-2', name: 3, dataAtr: 'C-3'},
                {area: 'VIP-2', name: 4, dataAtr: 'C-4'},
                {area: 'VIP-2', name: 5, dataAtr: 'C-5'},

                {area: 'VIP-3', name: 1, dataAtr: 'A-1', id: 'A', class: 'seat-letter'},
                {area: 'VIP-3', name: 2, dataAtr: 'A-2'},
                {area: 'VIP-3', name: 3, dataAtr: 'A-3'},
                {area: 'VIP-3', name: 4, dataAtr: 'A-4'},
                {area: 'VIP-3', name: 5, dataAtr: 'A-5'},
                {area: 'VIP-3', name: 1, dataAtr: 'B-1', id: 'B', class: 'seat-letter'},
                {area: 'VIP-3', name: 2, dataAtr: 'B-2'},
                {area: 'VIP-3', name: 3, dataAtr: 'B-3'},
                {area: 'VIP-3', name: 4, dataAtr: 'B-4'},
                {area: 'VIP-3', name: 5, dataAtr: 'B-5'},
                {area: 'VIP-3', name: 1, dataAtr: 'C-1', id: 'C', class: 'seat-letter'},
                {area: 'VIP-3', name: 2, dataAtr: 'C-2'},
                {area: 'VIP-3', name: 3, dataAtr: 'C-3'},
                {area: 'VIP-3', name: 4, dataAtr: 'C-4'},
                {area: 'VIP-3', name: 5, dataAtr: 'C-5'},

                {area: 'VIP-4', name: 1, dataAtr: 'A-1', id: 'A'},
                {area: 'VIP-4', name: 2, dataAtr: 'A-2'},
                {area: 'VIP-4', name: 3, dataAtr: 'A-3'},
                {area: 'VIP-4', name: 4, dataAtr: 'A-4'},
                {area: 'VIP-4', name: 5, dataAtr: 'A-5'},
                {area: 'VIP-4', name: 1, dataAtr: 'B-1', id: 'B'},
                {area: 'VIP-4', name: 2, dataAtr: 'B-2'},
                {area: 'VIP-4', name: 3, dataAtr: 'B-3'},
                {area: 'VIP-4', name: 4, dataAtr: 'B-4'},
                {area: 'VIP-4', name: 5, dataAtr: 'B-5'},
                {area: 'VIP-4', name: 1, dataAtr: 'C-1', id: 'C'},
                {area: 'VIP-4', name: 2, dataAtr: 'C-2'},
                {area: 'VIP-4', name: 3, dataAtr: 'C-3'},
                {area: 'VIP-4', name: 4, dataAtr: 'C-4'},
                {area: 'VIP-4', name: 5, dataAtr: 'C-5'},

                {area: 'VIP-5', name: 1, dataAtr: 'A-1', id: 'A'},
                {area: 'VIP-5', name: 2, dataAtr: 'A-2'},
                {area: 'VIP-5', name: 3, dataAtr: 'A-3'},
                {area: 'VIP-5', name: 4, dataAtr: 'A-4'},
                {area: 'VIP-5', name: 5, dataAtr: 'A-5'},
                {area: 'VIP-5', name: 1, dataAtr: 'B-1', id: 'B'},
                {area: 'VIP-5', name: 2, dataAtr: 'B-2'},
                {area: 'VIP-5', name: 3, dataAtr: 'B-3'},
                {area: 'VIP-5', name: 4, dataAtr: 'B-4'},
                {area: 'VIP-5', name: 5, dataAtr: 'B-5'},
                {area: 'VIP-5', name: 1, dataAtr: 'C-1', id: 'C'},
                {area: 'VIP-5', name: 2, dataAtr: 'C-2'},
                {area: 'VIP-5', name: 3, dataAtr: 'C-3'},
                {area: 'VIP-5', name: 4, dataAtr: 'C-4'},
                {area: 'VIP-5', name: 5, dataAtr: 'C-5'},

                {area: 'VIP-6', name: 1, dataAtr: 'A-1', id: 'A', class: 'seat-letter'},
                {area: 'VIP-6', name: 2, dataAtr: 'A-2'},
                {area: 'VIP-6', name: 3, dataAtr: 'A-3'},
                {area: 'VIP-6', name: 4, dataAtr: 'A-4'},
                {area: 'VIP-6', name: 5, dataAtr: 'A-5'},
                {area: 'VIP-6', name: 1, dataAtr: 'B-1', id: 'B', class: 'seat-letter'},
                {area: 'VIP-6', name: 2, dataAtr: 'B-2'},
                {area: 'VIP-6', name: 3, dataAtr: 'B-3'},
                {area: 'VIP-6', name: 4, dataAtr: 'B-4'},
                {area: 'VIP-6', name: 5, dataAtr: 'B-5'},
                {area: 'VIP-6', name: 1, dataAtr: 'C-1', id: 'C', class: 'seat-letter'},
                {area: 'VIP-6', name: 2, dataAtr: 'C-2'},
                {area: 'VIP-6', name: 3, dataAtr: 'C-3'},
                {area: 'VIP-6', name: 4, dataAtr: 'C-4'},
                {area: 'VIP-6', name: 5, dataAtr: 'C-5'},

                {area: 'VIP-7', name: 1, dataAtr: 'A-1', id: 'A', class: 'seat-letter'},
                {area: 'VIP-7', name: 2, dataAtr: 'A-2'},
                {area: 'VIP-7', name: 3, dataAtr: 'A-3'},
                {area: 'VIP-7', name: 4, dataAtr: 'A-4'},
                {area: 'VIP-7', name: 5, dataAtr: 'A-5'},
                {area: 'VIP-7', name: 1, dataAtr: 'B-1', id: 'B', class: 'seat-letter'},
                {area: 'VIP-7', name: 2, dataAtr: 'B-2'},
                {area: 'VIP-7', name: 3, dataAtr: 'B-3'},
                {area: 'VIP-7', name: 4, dataAtr: 'B-4'},
                {area: 'VIP-7', name: 5, dataAtr: 'B-5'},
                {area: 'VIP-7', name: 1, dataAtr: 'C-1', id: 'C', class: 'seat-letter'},
                {area: 'VIP-7', name: 2, dataAtr: 'C-2'},
                {area: 'VIP-7', name: 3, dataAtr: 'C-3'},
                {area: 'VIP-7', name: 4, dataAtr: 'C-4'},
                {area: 'VIP-7', name: 5, dataAtr: 'C-5'},

                {area: 'VIP-8', name: 1, dataAtr: 'A-1', id: 'A', class: 'seat-letter'},
                {area: 'VIP-8', name: 2, dataAtr: 'A-2'},
                {area: 'VIP-8', name: 3, dataAtr: 'A-3'},
                {area: 'VIP-8', name: 4, dataAtr: 'A-4'},
                {area: 'VIP-8', name: 5, dataAtr: 'A-5'},
                {area: 'VIP-8', name: 1, dataAtr: 'B-1', id: 'B', class: 'seat-letter'},
                {area: 'VIP-8', name: 2, dataAtr: 'B-2'},
                {area: 'VIP-8', name: 3, dataAtr: 'B-3'},
                {area: 'VIP-8', name: 4, dataAtr: 'B-4'},
                {area: 'VIP-8', name: 5, dataAtr: 'B-5'},
                {area: 'VIP-8', name: 1, dataAtr: 'C-1', id: 'C', class: 'seat-letter'},
                {area: 'VIP-8', name: 2, dataAtr: 'C-2'},
                {area: 'VIP-8', name: 3, dataAtr: 'C-3'},
                {area: 'VIP-8', name: 4, dataAtr: 'C-4'},
                {area: 'VIP-8', name: 5, dataAtr: 'C-5'},

                {area: 'VIP-9', name: 1, dataAtr: 'A-1', id: 'A', class: 'seat-letter'},
                {area: 'VIP-9', name: 2, dataAtr: 'A-2'},
                {area: 'VIP-9', name: 3, dataAtr: 'A-3'},
                {area: 'VIP-9', name: 4, dataAtr: 'A-4'},
                {area: 'VIP-9', name: 5, dataAtr: 'A-5'},
                {area: 'VIP-9', name: 1, dataAtr: 'B-1', id: 'B', class: 'seat-letter'},
                {area: 'VIP-9', name: 2, dataAtr: 'B-2'},
                {area: 'VIP-9', name: 3, dataAtr: 'B-3'},
                {area: 'VIP-9', name: 4, dataAtr: 'B-4'},
                {area: 'VIP-9', name: 5, dataAtr: 'B-5'},
                {area: 'VIP-9', name: 1, dataAtr: 'C-1', id: 'C', class: 'seat-letter'},
                {area: 'VIP-9', name: 2, dataAtr: 'C-2'},
                {area: 'VIP-9', name: 3, dataAtr: 'C-3'},
                {area: 'VIP-9', name: 4, dataAtr: 'C-4'},
                {area: 'VIP-9', name: 5, dataAtr: 'C-5'},

                {area: 'VIP-10', name: 1, dataAtr: 'A-1', id: 'A', class: 'seat-letter'},
                {area: 'VIP-10', name: 2, dataAtr: 'A-2'},
                {area: 'VIP-10', name: 3, dataAtr: 'A-3'},
                {area: 'VIP-10', name: 4, dataAtr: 'A-4'},
                {area: 'VIP-10', name: 5, dataAtr: 'A-5'},
                {area: 'VIP-10', name: 1, dataAtr: 'B-1', id: 'B', class: 'seat-letter'},
                {area: 'VIP-10', name: 2, dataAtr: 'B-2'},
                {area: 'VIP-10', name: 3, dataAtr: 'B-3'},
                {area: 'VIP-10', name: 4, dataAtr: 'B-4'},
                {area: 'VIP-10', name: 5, dataAtr: 'B-5'},
                {area: 'VIP-10', name: 1, dataAtr: 'C-1', id: 'C', class: 'seat-letter'},
                {area: 'VIP-10', name: 2, dataAtr: 'C-2'},
                {area: 'VIP-10', name: 3, dataAtr: 'C-3'},
                {area: 'VIP-10', name: 4, dataAtr: 'C-4'},
                {area: 'VIP-10', name: 5, dataAtr: 'C-5'},

            ];

            $scope.setMaster = function(section) {
                if (section.isSelected) {
                    section.isSelected = false;
                } else {
                    section.isSelected = true;
                }
            }

            $scope.isSelected = function(section) {
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