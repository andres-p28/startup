let guildSelected = angular.module('guildSelected',[]);

guildSelected.factory('guildSelected', function() {

    let guild = {};

    function setGuild(guildInfo) {
        guild = guildInfo;
    };

    function getGuild() {
        return guild;
    };

    return {
        /**
         * @param {Object} guild information    
         */
        setGuild: setGuild,
        /**
         * @return {Object} guild information    
         */
        getGuild: getGuild
    }
});
