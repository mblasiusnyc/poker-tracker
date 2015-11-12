'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CashGameSchema = new Schema({
	// owner: String,
	startTime: {
		type: Date,
		default: Date.now
	},
	endTime: Date,
	location: String,
	gameType: String,
	tableSize: Object,
	smallBlind: Number,
	bigBlind: Number,
	bankroll: String,
	buyIn: Number,
	cashOut: Number,
	tips: {
		type: Number,
		default: 0
	},
	breakTime: Number,
	hands: Object,
	comment: String
});

CashGameSchema.set('toJSON', { virtuals: true });

CashGameSchema.virtual('startDayNumber').get(function() {
  return this.startTime.getDate();
});

CashGameSchema.virtual('startDayOfWeek').get(function() {
	var daysOfWeek = {
		0: "Sunday",
		1: "Monday",
		2: "Tuesday",
		3: "Wednesday",
		4: "Thursday",
		5: "Friday",
		6: "Saturday"
	}
  return daysOfWeek[this.startTime.getDay()];
});



CashGameSchema.virtual('running').get(function() {
  return (this.endTime ? false : true);
});

var CashGameSchema = mongoose.model('CashGame', CashGameSchema);

module.exports = CashGameSchema;