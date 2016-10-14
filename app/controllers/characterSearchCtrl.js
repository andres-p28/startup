let characterSearchCtrl = angular.module('characterSearchCtrl',[])

characterSearchCtrl.controller('characterSearchCtrl', ['$scope', 'characterInfo', 'realmInfo', '$interval', 'characterSelected', '$location',  
    function($scope, characterInfo,  realmInfo, $interval, characterSelected, $location) {
    
    $scope.showResults = false;
    $scope.characterList = [];
    $scope.queryRealm = 'All';
    $scope.queryName = '';
    $scope.spinnerIcon = false;

    realmInfo.getList().success(function(data) {
            $scope.realmNames = data.realms.map((obj) => {return obj.name});
        }).error(function() {
            $scope.realmNames = [];
            $location.path('/error');
        });
    
    $scope.search = function() {
        $scope.characterList = [];
        $scope.spinnerIcon = true;
        if ($scope.queryRealm == 'All') {
            let i = 0;
            $interval(function() {
                let realm = $scope.realmNames[i];
                characterInfo.getCharInfo(realm, $scope.queryName).success(function(data) {
                    $scope.characterList.push(data);
                     $scope.spinnerIcon = false;
                    $scope.showResults = true;
                }).error(function(error) {
                    $scope.spinnerIcon = false;
                    if(error.reason != 'Character not found.')
                        $location.path('/error');
                });
                i++;   
            }, 50, $scope.realmNames.length);     
        } else {
            characterInfo.getCharInfo($scope.queryRealm, $scope.queryName).success(function(data) {
                $scope.characterList.push(data);
                $scope.spinnerIcon = false;
                $scope.showResults = true;
            }).error(function(error) {
                $scope.spinnerIcon = false;
                if(error.reason != 'Character not found.')
                    $location.path('/error');
            });
        }      
    };

    $scope.charInfo = function(character) {
        characterSelected.setChar(character);
        $location.path('/charinfo');
    };
}]);