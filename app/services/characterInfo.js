let characterInfo = angular.module('characterInfo',[]);

characterInfo.factory('characterInfo', function($http, apiConfig) {
    
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