let guildInfoCtrl = angular.module('guildInfoCtrl',[])

guildInfoCtrl.controller('guildInfoCtrl', ['$scope', 'guild','characterSelected', '$location', 'characterInfo',
    function($scope, guild, characterSelected, $location, characterInfo) {
    
    $scope.guild = guild;

    $scope.charInfo = function(character) {
        characterInfo.getCharInfo(character.realm, character.name).success(function(data) {
            characterSelected.setChar(data);
            $location.path('/charinfo');    
        }).error(function(){
            $location.path('/error');
        });
    };
}]);