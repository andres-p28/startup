let enumGender = angular.module('enumGender',[]);

enumGender.filter('enumGender', function() {
    return function(input) {
        if (input == 1)
            return 'Female'
        else
            return 'Male'
    }
});