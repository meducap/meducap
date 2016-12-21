var meducap = angular.module('meducap', ['ngResource','ngRoute', 'ngCsv']);

meducap.run(function ($rootScope, $location, auth) {
    $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
        if (auth.getUser()==null) {
            $location.path("/");
        }
        else {
            ev.preventDefault();
            $location.path("/dash");
        }
    });
});

meducap.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "templates/login.html",
            controller: 'LoginCtrl'
        })
        .when("/dash", {
            templateUrl : "templates/dash.html",
            controller: 'AppCtrl'
        })
        .otherwise({
            redirectTo: '/404'
        });
});