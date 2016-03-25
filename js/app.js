angular.module('loudApp',[
    'ngRoute',
    'loudApp.services',
    'loudApp.controllers',
    'ngAnimate',
    'ui.bootstrap'
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/showEvents.html',
                controller : 'EventsCtrl'
            })
            // .when('/', {
            //     templateUrl: 'views/buyTickets.html'
            // })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller : 'LoginCtrl'
            })
            .when('/event/:id', {
                templateUrl: 'views/eventDetail.html',
                controller : 'EventsCtrl'
            })
            .otherwise({
        	   templateUrl: 'views/404.html'
            });
    }
])