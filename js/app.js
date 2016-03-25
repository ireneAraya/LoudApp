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
            .when('/eventsList', {
                templateUrl: 'views/eventsList.html',
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