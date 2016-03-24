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
<<<<<<< HEAD
            .when('/login', {
                templateUrl: 'views/login.html',
                controller : 'LoginCtrl'
            })
            .when('/detail/:id', {
=======
            .when('/event/:id', {
>>>>>>> c132394e08ada4d65a9a1d64c8e8bad86249456a
                templateUrl: 'views/eventDetail.html',
                controller : 'EventsCtrl'
            })
            .otherwise({
        	   redirectTo: '/'
            });
    }
])