'use strict';

angular.module('pokerTrackerApp')
  .constant('DropdownOptions', {
  	gameType: ['Hold Em', 'Pot Limit Omaha', 'Omaha Hi/Lo', 'Razz'],
  	location: ['Ameristar', 'Mirage', 'Home Game'],
  	bankroll: ['Live Bankroll', 'Other Bankroll'],
  	tableSize: ['Heads Up','3 max','4 max','5 max','6 max','7 max','8 max','9 max','10 max']
  });