let realmInfo = angular.module('realmInfo',[]);

realmInfo.factory('realmInfo', function($http, apiConfig) {
    let params = {
        apikey: apiConfig.apikey,
        locale: apiConfig.locale,
    }
    
    function getList() {
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/realm/status',
            params: params
        })
    };
    
    return {
        /**
         * @return {Object} promise
         */
        getList: getList,
    }

});