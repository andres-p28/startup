let myApp = angular.module('myApp',[
    'ngRoute'
]);


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

myApp.factory('pvpLeaderboards', function($http, apiConfig) {

    function getBracket(bracket) {
        return $http({
            method: 'GET',
            url: apiConfig.baseUrl + '/wow/leaderboard/'+bracket,
            params: apiConfig,
            timeout: 120000 //setting timeout because API usually takes to long to respond
        })
    };
    return {
    /**
     * @param {String} bracket
     * @return {promise} complete leaderboard     
     */
     getBracket: getBracket
    }
});

myApp.controller('pvpLeaderboardsCtrl', ['$scope', 'pvpLeaderboards', 'characterInfo', '$location', 'characterSelected', 
    function($scope, pvpLeaderboards, characterInfo, $location, characterSelected) {   
    $scope.bracketList = [];
    $scope.spinnerIcon = false;

    $scope.search = function(bracket) {
        $scope.spinnerIcon = true;
        pvpLeaderboards.getBracket(bracket).success(function(data) {
            $scope.spinnerIcon = false;
            $scope.bracketList = data.rows.slice(0,10);
            $scope.showResults = true;
        }).error(function() {
            $scope.spinnerIcon = false;
            $location.path('/error');
        });
    }

    $scope.charInfo = function(character) {
        characterInfo.getCharInfo(character.realmName, character.name).success(function(data) {
            characterSelected.setChar(data);
            $location.path('/charinfo');    
        }).error(function(){
            $location.path('/error');
        });
    };
}]);

myApp.controller('characterInfoCtrl',['$scope', 'character', 'slotData', 'guildInfo', 'guildSelected', '$location',
    function($scope, character, slotData, guildInfo, guildSelected, $location) {
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
            case 'fury':
                return 'power-type-fury';
            default:
                return 'power-type-mana';              
        }
    };

    $scope.redirectGuild = function() {
        guildInfo.getGuildInfo($scope.character.realm, $scope.character.guild.name).success(function(data) {
            guildSelected.setGuild(data);
            $location.path('/guildinfo');    
        }).error(function() {
            $location.path('/error');
        });
;
    };
}]);

myApp.controller('guildInfoCtrl', ['$scope', 'guild','characterSelected', '$location', 'characterInfo',
    function($scope, guild, characterSelected, $location, characterInfo) {
    
    $scope.guild = guild;

    $scope.charInfo = function(character) {
        characterInfo.getCharInfo(character.realm, character.name).success(function(data) {
            characterSelected.setChar(data);
            $location.path('/charinfo');    
        }).error(function(){
            $location.path('/error');
        });
    };
}]);

myApp.controller('realmStatusCtrl', ['$scope', 'realmInfo', '$location', function($scope, realmInfo, $location) {
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

myApp.controller('characterSearchCtrl', ['$scope', 'characterInfo', 'realmInfo', '$interval', 'characterSelected', '$location',  
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

myApp.controller('guildSearchCtrl', ['$scope', 'guildInfo', 'realmInfo', '$interval', 'guildSelected', '$location', 
    function($scope, guildInfo, realmInfo, $interval, guildSelected, $location) {

    $scope.spinnerIcon = false;
    $scope.showResults = false;
    $scope.guildList = [];
    $scope.queryRealm = 'All';
    $scope.queryName = '';

    realmInfo.getList().success(function(data) {
            $scope.realmNames = data.realms.map((obj) => {return obj.name});
        }).error(function() {
            $scope.realmNames = [];
            $location.path('/error');
        });
    
    $scope.search = function() {
        $scope.guildList = [];
        $scope.spinnerIcon = true;
        if ($scope.queryRealm == 'All') {
            let i = 0;
            $interval(function() {
                let realm = $scope.realmNames[i];
                guildInfo.getGuildInfo(realm, $scope.queryName).success(function(data) {
                    $scope.guildList.push(data);
                    $scope.spinnerIcon = false;
                    $scope.showResults = true;
                }).error(function(error) {
                    $scope.spinnerIcon = false;
                    if(error.reason != 'Guild not found.')
                        $location('/error');
                });
                i++;   
            }, 50, $scope.realmNames.length);     
        } else {
            guildInfo.getGuildInfo($scope.queryRealm, $scope.queryName).success(function(data) {
                $scope.guildList.push(data);
                $scope.spinnerIcon = false;
                $scope.showResults = true;
            }).error(function(error) {
                $scope.spinnerIcon = false;
                if(error.reason != 'Guild not found.')
                    $location('/error');
            });
        }          
    };

    $scope.guildInfo = function(guild) {
        guildSelected.setGuild(guild);
        $location.path('/guildinfo');
    };
}]);

myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'main.html'
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
    templateUrl: 'pvprank.html',
    controller: 'pvpLeaderboardsCtrl'
    })
    .when('/error', {
        templateUrl:'error.html'
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
                return 'race_error'; 
      }
    }
});



