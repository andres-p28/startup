let pvpLeaderboards = angular.module('pvpLeaderboards',[]);

pvpLeaderboards.factory('pvpLeaderboards', function($http, apiConfig) {
    let params = {
        apikey: apiConfig.apikey,
        locale: apiConfig.locale,
    }

    function getBracket(bracket) {
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/leaderboard/'+bracket,
            params: params,
            timeout: 120000 //setting timeout because API usually takes to long to respond
        })
    };
    return {
    /**
     * @param {String} bracket
     * @return {promise} complete leaderboard     
     */
     getBracket: getBracket
    }
});