let myApp = angular.module('myApp',[]);
/*
myApp.factory('requestService', function($http){

    let httpVerb = 'GET';
    let baseUrl = 'https://us.api.battle.net';
    let apikey = '4psjyubs6z3gwzsquuqbp69vtnbgvfte';
    let locale = 'en_US';
    let fixedParams = {locale: locale, apikey: apikey};


    function request(endpoint, qobj){
        let queryObj = Object.assign(qobj, fixedParams);
        return $http({
            method: httpVerb,
            url: baseUrl + endpoint,
            params: queryObj
        }).success(function(data){
            return data;
        }).error(function(error, status){
            return {error : error, status: status};
        });
    };

    return {
        request: request
    };
});
*/

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
        }).success(function(data) {
            names = data.realms.map(function(obj) {return obj.name});
        });
    };
    
    
    return {
        /**
         * @return {Object} promise
         */
        getList: getList,
        /**
         *{Array} realms names
         */
        names : names   
    }
});

myApp.factory('characterInfo', function($http, apiConfig) {
    
    function getCharInfo(realm, characterName) {
        let params = {
            apikey: apiConfig.apikey,
            locale: apiConfig.locale,
            //fields: 'guild,items,pvp,stats'
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

myApp.controller('realmStatusCtrl', ['$scope', 'realmInfo', function($scope, realmInfo) {
    $scope.realmInfo = {};

    realmInfo.getList().success(function(data) {
        $scope.realmInfo.list = data.realms;
        console.log($scope.realmInfo.list);
    }).error(function(error, status){
        $scope.requestError = true;
        $scope.errorData = {error: error, status: status};
    });    

    $scope.updateStatus = function() {
        realmInfo.updateList();
        $scope.realm.list = realmInfo.getList();
    };
}]);

myApp.controller('characterInfoCtrl', ['$scope', 'characterInfo', 'realmInfo', function($scope, characterInfo, realmInfo) {
    $scope.characterList = [];
    $scope.queryRealm = 'Rexxar';
    $scope.queryName = 'Vral';
    
    $scope.searchButton = function() {
        $scope.characterList = [];
        if ($scope.queryRealm === 'All') {
            for(let i = 0; i < realmInfo.names.length; i++) {
                let realm = realmInfo.names[i];
                characterInfo.getCharInfo(realm, $scope.queryName).success(function(data) {
                    $scope.characterList.push(data);
                    console.log($scope.characterList);
                }).error(function() {
                    $scope.characterList = [];
                    $scope.requestError = true;
                });
            }
        } else {
            characterInfo.getCharInfo($scope.queryRealm, $scope.queryName).success(function(data) {
                $scope.characterList.push(data);
                console.log($scope.characterList);
            }).error(function() {
                $scope.characterList = [];
                $scope.requestError = true;
            });
        }      
    };
}]);




