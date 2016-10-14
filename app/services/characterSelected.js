let characterSelected = angular.module('characterSelected',[]);

characterSelected.factory('characterSelected', function() {

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