let enumFaction = angular.module('enumFaction',[]);

enumFaction.filter('enumFaction', function() {
    return function(input) {
        if (input == 0)
            return 'Alliance'
        else
            return 'Horde'
    }
});