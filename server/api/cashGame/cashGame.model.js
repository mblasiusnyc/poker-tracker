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
	tableSize: String,
	smallBlind: Number,
	bigBlind: Number,
	bankroll: String,
	buyIn: {
		type: Number,
		default: 0
	},
	cashOut: {
		type: Number,
		default: 0
	},
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
		0: "Sun",
		1: "Mon",
		2: "Tue",
		3: "Wed",
		4: "Thur",
		5: "Fri",
		6: "Sat"
	}
  return daysOfWeek[this.startTime.getDay()];
});

CashGameSchema.virtual('result').get(function() {
  return (this.running ? "" : (this.cashOut - this.buyIn));
});

CashGameSchema.virtual('running').get(function() {
  return (this.endTime < Date.now() ? false : true);
});

CashGameSchema.virtual('lengthMinutes').get(function() {
	if(this.endTime) {
		return (this.endTime-this.startTime)/(1000*60)
	} else {
	  return (Date.now()-this.startTime)/(1000*60);
	}
});

CashGameSchema.virtual('startDate').get(function() {
  return this.startTime.getFullYear()+'-'+this.startTime.getMonth()+'-'+this.startTime.getDate();
});

var CashGameSchema = mongoose.model('CashGame', CashGameSchema);

module.exports = CashGameSchema;