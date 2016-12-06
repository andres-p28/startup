let characterInfoCtrl = angular.module('characterInfoCtrl',[])

characterInfoCtrl.controller('characterInfoCtrl',['$scope', 'character', 'slotData', 'guildInfo', 'guildSelected', '$location',
    function($scope, character, slotData, guildInfo, guildSelected, $location) {
    $scope.character = character;
    $scope.slotList = slotData.list;

    $scope.powerTypeClass = function(){
        switch(character.stats.powerType) {
            case 'mana':
                return 'power-type-mana';
            case 'maelstrom':
                return 'power-type-maelstrom';
            case 'energy':
                return 'power-type-energy'; 
            case 'rage':
                return 'power-type-rage';
            case 'runic':
                return 'power-type-runic';
            case 'focus':
                return 'power-type-focus'; 
            case 'fury':
                return 'power-type-fury';
            default:
                return 'power-type-mana';              
        }
    };

    $scope.redirectGuild = function() {
        guildInfo.getGuildInfo($scope.character.realm, $scope.character.guild.name).success(function(data) {
            guildSelected.setGuild(data);
            $location.path('/guildinfo');    
        }).error(function() {
            $location.path('/error');
        });
    };
}]);