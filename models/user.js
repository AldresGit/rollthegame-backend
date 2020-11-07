'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	nickname: String,
	password: String,
	games: [Object]
});

module.exports = mongoose.model('User', UserSchema);