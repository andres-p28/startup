let myApp = angular.module('myApp',['ngRoute']);

myApp.constant('apiConfig', {
    baseUrl: 'https://us.api.battle.net',
    apikey: '4psjyubs6z3gwzsquuqbp69vtnbgvfte',
    locale:'en_US'
});

myApp.factory('realmInfo', function($http, apiConfig) {
    let names = [];

    function getList() {
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/realm/status',
            params: apiConfig
        });
    };
    
    return {
        /**
         * @return {Object} promise
         */
        getList: getList,
    }
});

myApp.factory('characterInfo', function($http, apiConfig) {
    
    function getCharInfo(realm, characterName) {
        let params = {
            apikey: apiConfig.apikey,
            locale: apiConfig.locale,
            fields: 'guild,items,pvp,stats'
        }
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/character/'+realm+'/'+characterName,
            params: params  
        });
    };

    return {
        /**
         * @param {String} realm name
         * @param {String} character name
         * @return {Object} promise
         */
         getCharInfo: getCharInfo
    }
});

myApp.factory('guildInfo', function($http, apiConfig) {
    function getGuildInfo(realm, guildName) {
        let params = {
            apikey: apiConfig.apikey,
            locale: apiConfig.locale,
            fields: 'members'
        }
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/guild/'+realm+'/'+guildName,
            params: params  
        });
    };

    return {
        /**
         * @param {String} realm name
         * @param {String} guild name
         * @return {Object} promise
         */
         getGuildInfo: getGuildInfo
    }

});

myApp.controller('realmStatusCtrl', ['$scope', 'realmInfo', function($scope, realmInfo) {
    $scope.realmInfo = {};

    realmInfo.getList().success(function(data) {
        $scope.realmInfo.list = data.realms;
    }).error(function(error, status){
        $scope.requestError = true;
        $scope.errorData = {error: error, status: status};
    });    

    $scope.updateStatus = function() {
        realmInfo.updateList();
        $scope.realm.list = realmInfo.getList();
    };
}]);

myApp.controller('characterSearchCtrl', ['$scope', 'characterInfo', 'realmInfo', '$interval', function($scope, characterInfo, 
    realmInfo, $interval) {
    
    $scope.characterList = [];
    $scope.queryRealm = 'All';
    $scope.queryName = 'Chigz';

    realmInfo.getList().success(function(data) {
            $scope.realmNames = data.realms.map((obj) => {return obj.name});
            console.log("names ready"); //testing
        }).error(function() {
            $scope.realmNames = [];
        });
    
    $scope.searchButton = function() {
        $scope.characterList = [];
        if ($scope.queryRealm == 'All') {
            let i = 0;
            $interval(function() {
                let realm = $scope.realmNames[i];
                characterInfo.getCharInfo(realm, $scope.queryName).success(function(data) {
                    $scope.characterList.push(data);
                }).error(function(error) {
                    console.log("char req :" +error); //testing
                });
                i++;   
            }, 50, 25/*$scope.realmNames.length*/);     
        } else {
            characterInfo.getCharInfo($scope.queryRealm, $scope.queryName).success(function(data) {
                $scope.characterList.push(data);
            }).error(function() {
                console.log("reqerror"); //testing
            });
        }      
    };
}]);

myApp.controller('characterInfoCtrl')

myApp.controller('guildInfoCtrl', ['$scope', 'guildInfo', 'realmInfo', '$interval', function($scope, guildInfo, 
    realmInfo, $interval) {

    $scope.guildInfo = {};
    guildInfo.getGuildInfo().success(function(data) {
        $scope.guildInfo = data;
    }).error(function(error) {
        $scope.guildInfo = {};
    });
}]);

myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when('/', {
        template: ''
        //templateUrl: 'main.html'
    })
    .when('/realmstatus', {       
        templateUrl: 'realm.html',
        controller: 'realmStatusCtrl'
    })
    .when('/charsearch', {
        templateUrl: 'charactersearch.html',
        controller: 'characterSearchCtrl'
    })
    .when('/charinfo', {
        templateUrl: 'characterinfo.html',
        controller: 'characterInfoCtrl' 
    })
    .when('/guildsearch', {
        templateUrl: 'guild.html',
        controller: 'guildInfoCtrl'
    })
    .when('/pvprank', {
    template: '',
    controller: ''
    })
    .otherwise({
        redirectTo: '/'
    });
}]);


