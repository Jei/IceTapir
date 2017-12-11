/*
* @Author: Jei
* @Date:   2017-12-07 18:11:46
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-11 16:33:05
*/

var mongoose = require('mongoose');

var database = mongoose.connect('mongodb://localhost/icetapir');

// mongoose.once('open', )

exports.db = {
  Users: database.model('User', require('.memory/user')),
  TelegramUsers: database.model('TelegramUser', require('.memory/telegramUser')),
};