let enumClass = angular.module('enumClass',[]);

enumClass.filter('enumClass', function() {
    return function(input) {
        switch(input){
            case 1:
                return 'Warrior';
            case 2:
                return 'Paladin';
            case 3:
                return 'Hunter';
            case 4:
                return 'Rogue';
            case 5:
                return 'Priest';
            case 6:
                return 'Death Knight';
            case 7:
                return 'Shaman';
            case 8:
                return 'Mage';
            case 9:
                return 'Warlock';
            case 10:
                return 'Monk';
            case 11:
                return 'Druid';
            case 12:
                return 'Demon Hunter';          
             default:
                return 'class_error'; 
      }
    }
});