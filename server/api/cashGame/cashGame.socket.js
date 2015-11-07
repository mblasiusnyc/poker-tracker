/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CashGame = require('./cashGame.model');

exports.register = function(socket) {
  CashGame.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CashGame.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('cashGame:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cashGame:remove', doc);
}