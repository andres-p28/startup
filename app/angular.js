let myApp = angular.module('myApp',['ngRoute']);

myApp.constant('apiConfig', {
    baseUrl: 'https://us.api.battle.net',
    apikey: '4psjyubs6z3gwzsquuqbp69vtnbgvfte',
    locale:'en_US'
});


myApp.factory('slotData', function() {
    let slotList = [
        {name: 'Back', prop: 'back'}, 
        {name: 'Chest', prop: 'chest'}, 
        {name: 'Feet', prop: 'feet'},
        {name: 'Finger', prop: 'finger1'},
        {name: 'Finger', prop: 'finger2'},
        {name: 'Hands', prop: 'hands'},
        {name: 'Head', prop: 'head'},
        {name: 'Legs', prop: 'legs'},
        {name: 'Main Hand', prop: 'mainHand'},
        {name: 'Off Hand', prop: 'offHand'},
        {name: 'Shoulder', prop: 'shoulder'},
        {name: 'Trinket', prop: 'trinket1'},
        {name: 'Trinket', prop: 'trinket2'},
        {name: 'Wrist', prop: 'wrist'},
        ];
    return {
        /*
        *@ {Array} List of Slot names and 
        *          respective property name
        **/
        list : slotList
    }
});

myApp.factory('realmInfo', function($http, apiConfig) {
    
    function getList() {
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/realm/status',
            params: apiConfig
        })
    };
    
    return {
        /**
         * @return {Object} promise
         */
        getList: getList,
    }

});

myApp.factory('characterInfo', function($http, apiConfig) {
    
    function getCharInfo(realm, characterName) {
        let params = {
            apikey: apiConfig.apikey,
            locale: apiConfig.locale,
            fields: 'guild,items,pvp,stats'
        }
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/character/'+realm+'/'+characterName,
            params: params  
        });
    };

    return {
        /**
         * @param {String} realm name
         * @param {String} character name
         * @return {Object} promise
         */
         getCharInfo: getCharInfo
    }
});

myApp.factory('guildInfo', function($http, apiConfig) {
    function getGuildInfo(realm, guildName) {
        let params = {
            apikey: apiConfig.apikey,
            locale: apiConfig.locale,
            fields: 'members'
        }
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/guild/'+realm+'/'+guildName,
            params: params  
        });
    };

    return {
        /**
         * @param {String} realm name
         * @param {String} guild name
         * @return {Object} promise
         */
         getGuildInfo: getGuildInfo
    }

});

myApp.factory('characterSelected', function() {

    let character = {};

    function setChar(characterInfo) {
        character = characterInfo;
    };

    function getChar() {
        return character;
    };

    return {
        /**
         * @param {Object} character information    
         */
        setChar: setChar,
        /**
         * @return {Object} character information    
         */
        getChar: getChar
    }
});

myApp.factory('guildSelected', function() {

    let guild = {};

    function setGuild(guildInfo) {
        guild = guildInfo;
    };

    function getGuild() {
        return guild;
    };

    return {
        /**
         * @param {Object} guild information    
         */
        setGuild: setGuild,
        /**
         * @return {Object} guild information    
         */
        getGuild: getGuild
    }
});

myApp.controller('characterInfoCtrl',['$scope', 'character', 'slotData', function($scope, character, slotData) {
    $scope.character = character;
    $scope.slotList = slotData.list;

    $scope.powerTypeClass = function(){
        switch(character.stats.powerType) {
            case 'mana':
                return 'power-type-mana';
            case 'maelstrom':
                return 'power-type-maelstrom';
            case 'energy':
                return 'power-type-energy'; 
            case 'rage':
                return 'power-type-rage';
            case 'runic':
                return 'power-type-runic';
            case 'focus':
                return 'power-type-focus';               
        }
    };

}]);

myApp.controller('guildInfoCtrl', ['$scope', 'guild', function($scope, guild) {
    $scope.guild = guild;

    $scope.charInfo = function(character) {
        characterSelected.setChar(character);
        $location.path('/charinfo');
    };
}]);

myApp.controller('realmStatusCtrl', ['$scope', 'realmInfo', function($scope, realmInfo) {
    $scope.realmInfo = {};

    realmInfo.getList().success(function(data) {
        $scope.realmInfo.list = data.realms;
    }).error(function(error, status){
        $scope.requestError = true;
        $scope.errorData = {error: error, status: status};
    });    

    $scope.updateStatus = function() {
        realmInfo.updateList();
        $scope.realm.list = realmInfo.getList();
    };
}]);

myApp.controller('characterSearchCtrl', ['$scope', 'characterInfo', 'realmInfo', '$interval', 'characterSelected', '$location',  
    function($scope, characterInfo,  realmInfo, $interval, characterSelected, $location) {
    
    $scope.showResults = false;
    $scope.characterList = [];
    $scope.queryRealm = 'All';
    $scope.queryName = 'Chigz';

    realmInfo.getList().success(function(data) {
            $scope.realmNames = data.realms.map((obj) => {return obj.name});
            console.log("names ready"); //testing
        }).error(function() {
            $scope.realmNames = [];
        });
    
    $scope.search = function() {
        $scope.characterList = [];
        if ($scope.queryRealm == 'All') {
            let i = 0;
            $interval(function() {
                let realm = $scope.realmNames[i];
                characterInfo.getCharInfo(realm, $scope.queryName).success(function(data) {
                    $scope.characterList.push(data);
                    console.log('CHARACTER ADDED'); //testing
                }).error(function(error) {
                });
                i++;   
            }, 50, 25/*$scope.realmNames.length*/);     
        } else {
            characterInfo.getCharInfo($scope.queryRealm, $scope.queryName).success(function(data) {
                $scope.characterList.push(data);
                console.log($scope.characterList); //testing
            }).error(function() {
                console.log("reqerror"); //testing
            });
        }
        $scope.showResults = true;      
    };

    $scope.charInfo = function(character) {
        characterSelected.setChar(character);
        $location.path('/charinfo');
    };
}]);

myApp.controller('guildSearchCtrl', ['$scope', 'guildInfo', 'realmInfo', '$interval', 'guildSelected', '$location', 
    function($scope, guildInfo, realmInfo, $interval, guildSelected, $location) {

    $scope.showResults = false;
    $scope.guildList = [];
    $scope.queryRealm = 'All';
    $scope.queryName = 'do my dance';

    realmInfo.getList().success(function(data) {
            $scope.realmNames = data.realms.map((obj) => {return obj.name});
        }).error(function() {
            $scope.realmNames = [];
            //TODO: catch error
        });
    
    $scope.search = function() {
        $scope.guildList = [];
        if ($scope.queryRealm == 'All') {
            let i = 0;
            $interval(function() {
                let realm = $scope.realmNames[i];
                guildInfo.getGuildInfo(realm, $scope.queryName).success(function(data) {
                    $scope.guildList.push(data);
                }).error(function(error) {
                    //TODO: catch error
                });
                i++;   
            }, 50, 25/*$scope.realmNames.length*/);     
        } else {
            guildInfo.getGuildInfo($scope.queryRealm, $scope.queryName).success(function(data) {
                $scope.guildList.push(data);
                console.log($scope.guildList); //testing
            }).error(function() {
                //TODO: catch error
            });
        }
        $scope.showResults = true;      
    };

    $scope.guildInfo = function(guild) {
        guildSelected.setGuild(guild);
        $location.path('/guildinfo');
    };
}]);

myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when('/', {
        template: ''
        //templateUrl: 'main.html'
    })
    .when('/realmstatus', {       
        templateUrl: 'realm.html',
        controller: 'realmStatusCtrl'
    })
    .when('/charsearch', {
        templateUrl: 'charactersearch.html',
        controller: 'characterSearchCtrl'
    })
    .when('/charinfo', {
        templateUrl: 'characterinfo.html',
        controller: 'characterInfoCtrl',
        resolve: {
            character : function(characterSelected) {
                return characterSelected.getChar();
            }
        }
    })
    .when('/guildsearch', {
        templateUrl: 'guildsearch.html',
        controller: 'guildSearchCtrl'
    })
    .when('/guildinfo', {
        templateUrl: 'guildinfo.html',
        controller: 'guildInfoCtrl',
        resolve: {
            guild : function(guildSelected) {
                return guildSelected.getGuild();
            }
        }
    })
    .when('/pvprank', {
    template: '',
    controller: ''
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

myApp.run(['$location', function ($location) {
        $location.path('/');
}]);


myApp.filter('enumFaction', function() {
    return function(input) {
        if (input == 0)
            return 'Alliance'
        else
            return 'Horde'
    }
});

myApp.filter('enumGender', function() {
    return function(input) {
        if (input == 1)
            return 'Female'
        else
            return 'Male'
    }
});


myApp.filter('enumClass', function() {
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

myApp.filter('enumRace', function() {
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
                return input; 
      }
    }
});



