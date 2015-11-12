'use strict';

var _ = require('lodash');
var CashGame = require('./cashGame.model');

// Get list of cashGames
exports.index = function(req, res) {
  CashGame.find(function (err, cashGames) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(cashGames);
  });
};

// Get a single cashGame
exports.show = function(req, res) {
  CashGame.findById(req.params.id, function (err, cashGame) {
    if(err) { return handleError(res, err); }
    if(!cashGame) { return res.status(404).send('Not Found'); }
    return res.json(cashGame);
  });
};

// Creates a new cashGame in the DB.
exports.create = function(req, res) {
  CashGame.create(req.body, function(err, cashGame) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(cashGame);
  });
};

// Updates an existing cashGame in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CashGame.findById(req.params.id, function (err, cashGame) {
    if (err) { return handleError(res, err); }
    if(!cashGame) { return res.status(404).send('Not Found'); }
    var updated = _.merge(cashGame, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(cashGame);
    });
  });
};

// Deletes a cashGame from the DB.
exports.destroy = function(req, res) {
  CashGame.findById(req.params.id, function (err, cashGame) {
    if(err) { return handleError(res, err); }
    if(!cashGame) { return res.status(404).send('Not Found'); }
    cashGame.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}