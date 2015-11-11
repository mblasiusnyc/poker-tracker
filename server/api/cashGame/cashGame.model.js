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

module.exports = mongoose.model('CashGame', CashGameSchema);