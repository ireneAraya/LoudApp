angular.module('loudApp',[
    'ngRoute',
    'ngMap',
    'loudApp.directives',
    'loudApp.services',
    'loudApp.controllers',
    'ngAnimate',
    'ui.bootstrap',
    'ngMessages',
    'facebook',
    'ngResource',
    'ngSanitize'
])

.config(['$routeProvider','FacebookProvider',
    function($routeProvider, FacebookProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'front-end/views/showEvents.html',
                 controller : 'EventsCtrl'
            })
            // Buy Tickets
            .when('/buyTickets', {
                templateUrl: 'front-end/views/buyTickets/buyTickets_event.html',
                controller : 'buyticketsCtrl'
            })
            .when('/buyTickets/tickets', {
                templateUrl: 'front-end/views/buyTickets/buyTickets_cant.html',
                controller : 'buyticketsCtrl'
            })
            .when('/buyTickets/tickets/seats', {
                templateUrl: 'front-end/views/buyTickets/buyTickets_seats.html',
                controller : 'buyticketsCtrl'
            })
            .when('/buyTickets/tickets/seats/detail', {
                templateUrl: 'front-end/views/buyTickets/buyTickets_detail.html',
                controller : 'buyticketsCtrl'
            })
            .when('/buyTickets/tickets/seats/detail/cardinformation', {
                templateUrl: 'front-end/views/buyTickets/buyTickets_cardInformation.html',
                controller : 'buyticketsCtrl'
            })
            .when('/buyTickets/tickets/seats/detail/cardinformation/success', {
                templateUrl: 'front-end/views/buyTickets/buyTickets_success.html'
            })
            // Buy Tickets END
            .when('/login', {
                templateUrl: 'front-end/views/login.html',
                controller : 'LoginCtrl'
            })
            .when('/register', {
                templateUrl: 'front-end/views/register.html',
                controller : 'RegisterCtrl'
            })
            .when('/profile', {
                templateUrl: 'front-end/views/profile.html',
                controller : 'ProfileCtrl'
            })
            .when('/forgot', {
                templateUrl: 'front-end/views/forgot-password.html',
                controller : 'ForgotPasswordCtrl'
            })
            // Events
            .when('/event/:id', {
                templateUrl: 'front-end/views/eventDetail.html',
                controller : 'EventsCtrl'
            })
            .when('/eventsList', {
                templateUrl: 'front-end/views/eventsList.html',
                controller: 'EventsCtrl'
            })
            .when('/editEvent/:id', {
                templateUrl: 'front-end/views/editEvent.html',
                controller: 'EventsCtrl'
            })
            .when('/addEvent', {
                templateUrl: 'front-end/views/addEvent.html',
                controller: 'addEventCtrl'
            })
            // Locations
            .when('/locationsList', {
                templateUrl: 'front-end/views/locationsList.html',
                controller: 'LocationsCtrl'
            })
            .when('/editLocation/:id', {
                templateUrl: 'front-end/views/editLocation.html',
                controller: 'LocationsCtrl'
            })
            .when('/addLocation', {
                templateUrl: 'front-end/views/addLocation.html',
                controller: 'LocationsCtrl'
            })
            // EventTypes
            .when('/eventTypesList', {
                templateUrl: 'front-end/views/eventTypesList.html',
                controller: 'eventTypesCtrl'
            })
            .when('/addEventType/:id?', {
                templateUrl: 'front-end/views/addEventType.html',
                controller: 'eventTypesCtrl'
            })
            //Users
            .when('/addPromoter', {
                templateUrl: 'front-end/views/addPromoter.html',
                controller: 'PromotersCtrl'
            })
            .when('/promotersList', {
                templateUrl: 'front-end/views/promotersList.html',
                controller: 'PromotersCtrl'
            })
            .when('/addCashier', {
                templateUrl: 'front-end/views/addCashier.html',
                controller: 'CashiersCtrl'
            })
            .when('/editCashier/:id', {
                templateUrl: 'views/editCashier.html',
                controller : 'CashiersCtrl'
            })
            .when('/cashiersList', {
                templateUrl: 'front-end/views/cashiersList.html',
                controller: 'CashiersCtrl'
            })
            .when('/contact', {
                templateUrl: 'front-end/views/contact.html'
            })
            .when('/adminMenu', {
                templateUrl: 'front-end/views/adminMenu.html',
                controller: 'AdminMenuCtrl'
            })
            .when('/promotersMenu', {
                templateUrl: 'front-end/views/promotersMenu.html'
            })
            .when('/cashiersMenu', {
                templateUrl: 'front-end/views/cashiersMenu.html'
            })
            .when('/terms', {
                templateUrl: 'front-end/views/terms.html'
            })
            .when('/privacy', {
                templateUrl: 'front-end/views/privacy.html'
            })
            .otherwise({
        	   templateUrl: 'front-end/views/404.html'
            });

        var myAppId = '1046016745413247';
        FacebookProvider.setAppId(myAppId);
        FacebookProvider.init(myAppId);
    }
])