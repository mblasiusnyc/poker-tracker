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
	smallBlind: Number,
	bigBlind: Number,
	bankroll: String,
	// buyIn: Number,
	// cashOut: Number,
	// tips: Number,
	tableSize: Number
	// comment: String
});

module.exports = mongoose.model('CashGame', CashGameSchema);