angular.module('loudApp',[
    'ngRoute',
    'loudApp.services',
    'loudApp.controllers',
    'ngAnimate',
    'ui.bootstrap',
    'facebook'
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
                controller : 'TypeaheadCtrl'
            })
            .when('/buyTickets/tickets', {
                templateUrl: 'views/buyTickets/buyTickets_cant.html'
                // controller : 'buyticketsCtrl'
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
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller : 'ProfileCtrl'
            })
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
            .otherwise({
        	   templateUrl: 'views/404.html'
            });

        var myAppId = '1046016745413247';
        FacebookProvider.setAppId(myAppId);
        FacebookProvider.init(myAppId);
    }
])