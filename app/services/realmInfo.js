let realmInfo = angular.module('realmInfo',[]);

realmInfo.factory('realmInfo', function($http, apiConfig) {
    
    function getList() {
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/realm/status',
            params: apiConfig
        })
    };
    
    return {
        /**
         * @return {Object} promise
         */
        getList: getList,
    }

});