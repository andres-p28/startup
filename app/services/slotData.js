let slotData = angular.module('slotData',[]);

slotData.factory('slotData', function() {
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