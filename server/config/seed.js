/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var CashGame = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

    // CashGame.find({}).remove(function() {
    // 	  CashGame.create({
    // 		startTime: new Date("Dec-10-2015"),
    // 		endTime: new Date("Dec-10-2015"),
    // 		location: "Ameristar",
    // 		gameType: "Hold Em",
    // 		tableSize: "9 max",
    // 		smallBlind: 1,
    // 		bigBlind: 2,
    // 		bankroll: "Live Bankroll",
    // 		buyIn: 300,
    // 		cashOut: 400,
    // 	});
    // });

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});