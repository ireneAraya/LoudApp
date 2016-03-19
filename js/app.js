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
            .otherwise({
        	   redirectTo: '/'
            });
    }
])