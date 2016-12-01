var myApp = angular.module('myApp', ['ngRoute']);

myApp.factory('movieData', function() { /* Both factory and service are singletons */

    let movieData = {};

    movieData.list = angular.fromJson(localStorage.getItem("movieList"));

    movieData.add = function(data) {
        movieData.list.push(data);
        localStorage.setItem("movieList", JSON.stringify(movieData.list));
    };

    movieData.delete = function(itemIndex) {
        movieData.list.splice(itemIndex,1);
        localStorage.setItem("movieList", JSON.stringify(movieData.list));
    };
    movieData.getItem = function(itemIndex) {
        return movieData.list[itemIndex];
    };
    movieData.saveChange = function() {
        localStorage.setItem("movieList", JSON.stringify(movieData.list));  
    };
    movieData.setIndex = function(newIndex) {
        movieData.index = newIndex;
    };

    return movieData;
});


myApp.controller('listCtrl', ['$scope', 'movieData', '$route', function($scope, movieData, $route) {
    
    $scope.movies = {};
    $scope.movies.list = movieData.list;

    $scope.setmovieIndex = function(index) {
        movieData.setIndex(index);
    }

    $scope.reloadView = function() {
        $route.reload();
    }
}]);

myApp.controller('addCtrl', ['$scope', 'movieData', '$location', function($scope, movieData, $location)  {
    $scope.mode = 'Add movie';
    $scope.button = 'Save';
    $scope.isDisabled = false;

    $scope.buttonClick = function() {
        movieData.add(angular.copy($scope.movie));
        $scope.movie = {};
        $location.path('/');
    };
}]);

myApp.controller('showCtrl', ['$scope', 'movieData', '$location', function($scope, movieData, $location) {
    $scope.mode = 'Details';
    $scope.button = 'Close';
    $scope.isDisabled = true;
    $scope.movie = movieData.list[movieData.index];

    $scope.buttonClick = function() {
        $location.path('/');    
    };
}]);

myApp.controller('delCtrl', ['$scope', 'movieData', function($scope, movieData) {
    movieData.delete(movieData.index);
}]);

myApp.controller('editCtrl', ['$scope', 'movieData', '$location', function($scope, movieData, $location) {
    $scope.mode = 'Edit movie';
    $scope.button = 'Save';
    $scope.isDisabled = false;
    if (movieData.index != null)
        $scope.movie = movieData.getItem(movieData.index);
    else
        $location.path('/add');

    $scope.buttonClick = function() {
        movieData.saveChange();
        $scope.movie = {};
        $location.path('/'); 
    };    
}])

myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when('/', {
        template: ''
    })
    .when('/add', {       
        templateUrl: 'form.html',
        controller: 'addCtrl'
    })
    .when('/edit', {
        templateUrl: 'form.html',
        controller: 'editCtrl'
    })
    .when('/details', {
        templateUrl: 'form.html',
        controller: 'showCtrl'
    })
    .when('/delete', {
    template: '',
    controller: 'delCtrl',
    redirectTo: '/'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

