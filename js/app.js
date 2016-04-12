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
    'ngResource'
])

.config(['$routeProvider','FacebookProvider',
    function($routeProvider, FacebookProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/showEvents.html',
                 controller : 'EventsCtrl'
            })
            // Buy Tickets
            .when('/buyTickets', {
                templateUrl: 'views/buyTickets/buyTickets_event.html',
                controller : 'buyticketsCtrl'
            })
            .when('/buyTickets/tickets', {
                templateUrl: 'views/buyTickets/buyTickets_cant.html',
                controller : 'buyticketsCtrl'
            })
            .when('/buyTickets/tickets/seats', {
                templateUrl: 'views/buyTickets/buyTickets_seats.html'
            })
            .when('/buyTickets/tickets/seats/detail', {
                templateUrl: 'views/buyTickets/buyTickets_detail.html'
            })
            .when('/buyTickets/tickets/seats/detail/cardinformation', {
                templateUrl: 'views/buyTickets/buyTickets_cardInformation.html'
            })
            .when('/buyTickets/tickets/seats/detail/cardinformation/success', {
                templateUrl: 'views/buyTickets/buyTickets_success.html'
            })
            // Buy Tickets END
            .when('/login', {
                templateUrl: 'views/login.html',
                controller : 'LoginCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller : 'RegisterCtrl'
            })
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller : 'ProfileCtrl'
            })
            // Events
            .when('/event/:id', {
                templateUrl: 'views/eventDetail.html',
                controller : 'EventsCtrl'
            })
            .when('/eventsList', {
                templateUrl: 'views/eventsList.html',
                controller: 'EventsCtrl'
            })
            .when('/editEvent/:id', {
                templateUrl: 'views/editEvent.html',
                controller: 'EventsCtrl'
            })
            .when('/addEvent', {
                templateUrl: 'views/addEvent.html',
                controller: 'EventsCtrl'
            })
            // Locations
            .when('/locationsList', {
                templateUrl: 'views/locationsList.html',
                controller: 'LocationsCtrl'
            })
            .when('/editLocation/:id', {
                templateUrl: 'views/editLocation.html',
                controller: 'LocationsCtrl'
            })
            .when('/addLocation', {
                templateUrl: 'views/addLocation.html',
                controller: 'LocationsCtrl'
            })
            // EventTypes
            .when('/eventTypesList', {
                templateUrl: 'views/eventTypesList.html',
                controller: 'eventTypesCtrl'
            })
            .when('/addEventType/:id?', {
                templateUrl: 'views/addEventType.html',
                controller: 'eventTypesCtrl'
            })
            .otherwise({
        	   templateUrl: 'views/404.html'
            });

        var myAppId = '1046016745413247';
        FacebookProvider.setAppId(myAppId);
        FacebookProvider.init(myAppId);
    }
])