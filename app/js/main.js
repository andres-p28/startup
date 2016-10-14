let myApp = angular.module('myApp',[
    'ngRoute',
    'apiConfig',
    'slotData',
    'realmInfo',
    'characterInfo',
    'guildInfo',
    'pvpLeaderboards',
    'guildSelected',
    'characterSelected',
    'characterInfoCtrl',
    'pvpLeaderboardsCtrl',
    'guildInfoCtrl',
    'realmStatusCtrl',
    'characterSearchCtrl',
    'guildSearchCtrl',
    'enumRace',
    'enumClass',
    'enumGender',
    'enumFaction'
]);


myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html'
    })
    .when('/realmstatus', {       
        templateUrl: 'views/realm.html',
        controller: 'realmStatusCtrl'
    })
    .when('/charsearch', {
        templateUrl: 'views/charactersearch.html',
        controller: 'characterSearchCtrl'
    })
    .when('/charinfo', {
        templateUrl: 'views/characterinfo.html',
        controller: 'characterInfoCtrl',
        resolve: {
            character : function(characterSelected) {
                return characterSelected.getChar();
            }
        }
    })
    .when('/guildsearch', {
        templateUrl: 'views/guildsearch.html',
        controller: 'guildSearchCtrl'
    })
    .when('/guildinfo', {
        templateUrl: 'views/guildinfo.html',
        controller: 'guildInfoCtrl',
        resolve: {
            guild : function(guildSelected) {
                return guildSelected.getGuild();
            }
        }
    })
    .when('/pvprank', {
    templateUrl: 'views/pvprank.html',
    controller: 'pvpLeaderboardsCtrl'
    })
    .when('/error', {
        templateUrl:'views/error.html'
    }) 
    .otherwise({
        redirectTo: '/'
    });
}]);

myApp.run(['$location', function ($location) {
        $location.path('/');
}]);