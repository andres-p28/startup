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

myApp.factory('realmStatus', function($http, apiConfig) {

    function getList() {
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/realm/status',
            params: apiConfig
        });
    };
    
    return {

        getList: getList
    }
})

myApp.controller('realmStatusCtrl', ['$scope', 'realmStatus', function($scope, realmStatus) {
    $scope.realmInfo = {};

    realmStatus.getList().success(function(data) {
        $scope.realmInfo.list = data.realms;
        console.log($scope.realmInfo.list);
    }).error(function(error, status){
        $scope.requestError = true;
        $scope.errorData = {error: error, status: status};
    });    

    $scope.updateStatus = function() {
        realmStatus.updateList();
        $scope.realm.list = realmStatus.getList();
    }
}])



