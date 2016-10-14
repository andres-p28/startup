let pvpLeaderboardsCtrl = angular.module('pvpLeaderboardsCtrl',[])

pvpLeaderboardsCtrl.controller('pvpLeaderboardsCtrl', ['$scope', 'pvpLeaderboards', 'characterInfo', '$location', 'characterSelected', 
    function($scope, pvpLeaderboards, characterInfo, $location, characterSelected) {   
    $scope.bracketList = [];
    $scope.spinnerIcon = false;

    $scope.search = function(bracket) {
        $scope.spinnerIcon = true;
        pvpLeaderboards.getBracket(bracket).success(function(data) {
            $scope.spinnerIcon = false;
            $scope.bracketList = data.rows.slice(0,10);
            $scope.showResults = true;
        }).error(function() {
            $scope.spinnerIcon = false;
            $location.path('/error');
        });
    }

    $scope.charInfo = function(character) {
        characterInfo.getCharInfo(character.realmName, character.name).success(function(data) {
            characterSelected.setChar(data);
            $location.path('/charinfo');    
        }).error(function(){
            $location.path('/error');
        });
    };
}]);