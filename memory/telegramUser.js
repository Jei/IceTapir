/*
* @Author: Jei
* @Date:   2017-12-11 16:08:24
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-12 12:03:56
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var telegramUserSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  // Taken from https://core.telegram.org/bots/api#user
  id: {
    type: Number,
    unique: true,
  },
  is_bot: Boolean,
  first_name: String,
  last_name: String,
  username: String,
  language_code: String,
});

telegramUserSchema.methods.isAdmin = function() {
  return this.user != null ? this.user.isAdmin() : false;
};

telegramUserSchema.methods.getPrettyName = function() {
  if (this.username != null) {
    return this.username;
  } else {
    return [this.first_name, this.last_name].join(' ');
  }
};

module.exports = telegramUserSchema;
