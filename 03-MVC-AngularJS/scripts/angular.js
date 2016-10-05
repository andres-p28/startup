var myApp = angular.module('myApp', []);

myApp.factory('movieClick', () => {
    let movieInfo = {};
    return movieInfo;
});

myApp.controller('MoviesCtrl', ['$scope', '$rootScope', ($scope, $rootScope, movieClick) => {
    
    $scope.movies = {};
    $scope.movies.list = angular.fromJson(localStorage.getItem("movieList"));

    $scope.update = () => {
        $scope.movies.list = angular.fromJson(localStorage.getItem("movieList"));
    }

    $scope.showMovie = (movie) => {
        //movieInfo.movie = movie;
        //movieInfo.mode = "read";
        $rootScope.$broadcast('detail', movie);
    }

    $scope.editMovie = (movie) => {
        //movieInfo.movie = movie;
        //movieInfo.mode = "readwrite";
        $rootScope.$broadcast("edit", movie);
    }

    $scope.deleteMovie = (index) => {
        $scope.movies.list.splice(index,1);
    }

    $scope.$on("addMovie", (event, data) => {
        $scope.movies.list.push(angular.copy(data));
    })

}]);


myApp.controller('adeCtrl', ['$scope','$rootScope', ($scope, $rootScope, movieClick) => { 
    $scope.isAdding = false;
    $scope.isEditing = false;
    $scope.showDetails = false;

    $scope.$on('detail', (event, data) => {
        $scope.showDetails = true;
        $scope.movie = data;
    })

    $scope.$on("edit", (event, data) => {
        $scope.isEditing = true;
        $scope.movie = data;
    })

    $scope.addMovie = (movieToAdd) => {
        $rootScope.$broadcast("addMovie", movieToAdd);
    }

}]);

/*

$scope.movies = {};

    $scope.movies.list = [{
        "title": "The Shawshank Redemption",
        "year": "1994",
        "duration": "142"
    },{
        "title": "Inception",
        "year": "2010",
        "duration": "148"
    },{
        "title": "The Hobbit: An Unexpected Journey",
        "year": "2012",
        "duration": "169"
    },{
        "title": "Back to the Future",
        "year": "1985",
        "duration": "116"
    }];

    $scope.isVisible = false;
    $scope.isEditing = false;

    $scope.deleteMovie = (index) => {
        $scope.movies.list.splice(index,1);
    }

    $scope.addMovie = (movie) => {
        $scope.movies.list.push(angular.copy(movie));
    }

    $scope.saveMovie = (movie, index) => {
        $scope.movies.list[index] = angular.copy(movie);
        console.log($scope.movies.list);
    }
*/
