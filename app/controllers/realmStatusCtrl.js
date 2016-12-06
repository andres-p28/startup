let realmStatusCtrl = angular.module('realmStatusCtrl',[])

realmStatusCtrl.controller('realmStatusCtrl', ['$scope', 'realmInfo', '$location', function($scope, realmInfo, $location) {
    $scope.realmInfo = {};
    $scope.showResults = false;
    $scope.spinnerIcon = true;

    realmInfo.getList().success(function(data) {
        $scope.realmInfo.list = data.realms;
        $scope.spinnerIcon = false;
        $scope.showResults = true;
    }).error(function() {
        $location.path('/error');
    });    

}]);