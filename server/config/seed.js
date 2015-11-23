/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var CashGame = require('../api/cashGame/cashGame.model');
var User = require('../api/user/user.model');

	CashGame.find({}).remove(function() {
		  CashGame.create({
			startTime: new Date("Oct-10-2015 11:00 AM"),
			endTime: new Date("Oct-10-2015 04:30 PM"),
			location: "Ameristar",
			gameType: "Hold Em",
			tableSize: "9 max",
			smallBlind: 1,
			bigBlind: 2,
			buyIn: 300,
			cashOut: 400
		}, {
			startTime: new Date("Oct-12-2015 10:00 AM"),
			endTime: new Date("Oct-12-2015 06:30 PM"),
			location: "Ameristar",
			gameType: "Hold Em",
			tableSize: "9 max",
			smallBlind: 1,
			bigBlind: 2,
			buyIn: 400,
			cashOut: 200
		}, {
			startTime: new Date("Nov-05-2015 11:00 AM"),
			endTime: new Date("Nov-05-2015 04:30 PM"),
			location: "Ameristar",
			gameType: "Hold Em",
			tableSize: "9 max",
			smallBlind: 1,
			bigBlind: 2,
			buyIn: 500,
			cashOut: 550
		});
	});

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