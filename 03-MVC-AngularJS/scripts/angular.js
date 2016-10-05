var myApp = angular.module('myApp', []);

myApp.factory('movieClick', () => {
    let movieInfo = {};
    return movieInfo;
});

myApp.controller('MoviesCtrl', ['$scope', '$rootScope', ($scope, $rootScope, movieClick) => {
    
    $scope.movies = {};
    $scope.movies.list = angular.fromJson(localStorage.getItem("movieList"));

    let update = () => {
        localStorage.setItem("movieList", JSON.stringify($scope.movies.list));
    }

    $scope.showMovie = (movie) => {
        $rootScope.$broadcast('detail', angular.copy(movie));
    }

    $scope.editMovie = (movie) => {
        $rootScope.$broadcast("edit", movie);
    }

    $scope.deleteMovie = (index) => {
        $scope.movies.list.splice(index,1);
        update();
    }

    $scope.$on("addMovie", (event, data) => {
        $scope.movies.list.push(angular.copy(data));
        update();
    })

    $scope.$on("update", (event, data) => {
        update();
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
        $scope.isAdding = false;
    }

    $scope.saveEdit = () => {
        $rootScope.$broadcast("update");
        $scope.isEditing = false;
    }

}]);

/*
    I read a lot of comment about sharing data between controllers should be done using factory/services
    instead of broadcasting events because of perfomance, but the comments weren't updated; so at the moment, 
    factory/services approch still being better than broadcasting/listening?
*/
