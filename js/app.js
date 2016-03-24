angular.module('loudApp',[
    'ngRoute',
    'loudApp.services',
    'loudApp.controllers',
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/showEvents.html',
                controller : 'EventsCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller : 'LoginCtrl'
            })
            .when('/event/:id', {
                templateUrl: 'views/eventDetail.html',
                controller : 'EventsCtrl'
            })
            .otherwise({
        	   redirectTo: '/'
            });
    }
])