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
            // .when('/', {
            //     templateUrl: 'views/showEvents.html',
            //     controller : 'EventsCtrl'
            // })
            .when('/detail/:id', {
                templateUrl: 'views/eventDetail.html',
                controller : 'EventsCtrl'
            })
            .when('/', {
                templateUrl: 'views/buyTickets.html'
            })
            .otherwise({
        	   redirectTo: '/'
            });
    }
])