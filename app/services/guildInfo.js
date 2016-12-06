let guildInfo = angular.module('guildInfo',[]);

guildInfo.factory('guildInfo', function($http, apiConfig) {
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