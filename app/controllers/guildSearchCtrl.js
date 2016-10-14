let guildSearchCtrl = angular.module('guildSearchCtrl',[]);

guildSearchCtrl.controller('guildSearchCtrl', ['$scope', 'guildInfo', 'realmInfo', '$interval', 'guildSelected', '$location', 
    function($scope, guildInfo, realmInfo, $interval, guildSelected, $location) {

    $scope.spinnerIcon = false;
    $scope.showResults = false;
    $scope.guildList = [];
    $scope.queryRealm = 'All';
    $scope.queryName = '';

    realmInfo.getList().success(function(data) {
            $scope.realmNames = data.realms.map((obj) => {return obj.name});
        }).error(function() {
            $scope.realmNames = [];
            $location.path('/error');
        });
    
    $scope.search = function() {
        $scope.guildList = [];
        $scope.spinnerIcon = true;
        if ($scope.queryRealm == 'All') {
            let i = 0;
            $interval(function() {
                let realm = $scope.realmNames[i];
                guildInfo.getGuildInfo(realm, $scope.queryName).success(function(data) {
                    $scope.guildList.push(data);
                    $scope.spinnerIcon = false;
                    $scope.showResults = true;
                }).error(function(error) {
                    $scope.spinnerIcon = false;
                    if(error.reason != 'Guild not found.')
                        $location('/error');
                });
                i++;   
            }, 50, $scope.realmNames.length);     
        } else {
            guildInfo.getGuildInfo($scope.queryRealm, $scope.queryName).success(function(data) {
                $scope.guildList.push(data);
                $scope.spinnerIcon = false;
                $scope.showResults = true;
            }).error(function(error) {
                $scope.spinnerIcon = false;
                if(error.reason != 'Guild not found.')
                    $location('/error');
            });
        }          
    };

    $scope.guildInfo = function(guild) {
        guildSelected.setGuild(guild);
        $location.path('/guildinfo');
    };
}]);

