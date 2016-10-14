let enumRace = angular.module('enumRace',[]);

enumRace.filter('enumRace', function() {
    return function(input) {
        switch(input){
            case 1:
                return 'Human';
            case 2:
                return 'Orc';
            case 3:
                return 'Dwarf';
            case 4:
                return 'Night elf';
            case 5:
                return 'Undead';
            case 6:
                return 'Tauren';
            case 7:
                return 'Gnome';
            case 8:
                return 'Troll';
            case 9:
                return 'Goblin';
            case 10:
                return 'Blood elf';
            case 11:
                return 'Draenei';
            case 22:
                return 'Worgen';
            case 24:
                return 'Pandaren';
            case 25:
                return 'Pandaren';
            case 26:
                return 'Pandaren';            
             default:
                return 'race_error'; 
      }
    }
});