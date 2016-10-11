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
        });
    };
    
    return {
        /**
         * @return {Object} promise
         */
        getList: getList,
    }
});
/*
myApp.service('realmNames', function(realmInfo) {
    realmInfo.getList().success(function(data) {
            this.list = data.realms.map((obj) => {return obj.name});
            console.log("names ready" + this); //testing
        }).error(function() {
            this.list = [];
        });
});
*/
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

myApp.controller('realmStatusCtrl', ['$scope', 'realmInfo', function($scope, realmInfo) {
    $scope.realmInfo = {};

    realmInfo.getList().success(function(data) {
        $scope.realmInfo.list = data.realms;
        //console.log($scope.realmInfo.list);
    }).error(function(error, status){
        $scope.requestError = true;
        $scope.errorData = {error: error, status: status};
    });    

    $scope.updateStatus = function() {
        realmInfo.updateList();
        $scope.realm.list = realmInfo.getList();
    };
}]);

myApp.controller('characterInfoCtrl', ['$scope', 'characterInfo', 'realmInfo', '$interval', function($scope, characterInfo, 
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
                    console.log($scope.characterList); //testing
                }).error(function(error) {
                    console.log("char req :" +error); //testing
                });
                i++;   
            }, 50, 25/*$scope.realmNames.length*/);     
        } else {
            characterInfo.getCharInfo($scope.queryRealm, $scope.queryName).success(function(data) {
                $scope.characterList.push(data);
                console.log($scope.characterList);
            }).error(function() {
                console.log("reqerror"); //testing
            });
        }      
    };
}]);




