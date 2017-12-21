/*
* @Author: Jei
* @Date:   2017-12-11 16:08:24
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 10:55:18
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var telegramUserSchema = new Schema({
  // Taken from https://core.telegram.org/bots/api#user
  _id: { type: Number, required: true },
  is_bot: Boolean,
  first_name: String,
  last_name: String,
  username: String,
  language_code: String,
});

telegramUserSchema.methods.getPrettyName = function() {
  if (this.username != null) {
    return this.username;
  } else {
    return [this.first_name, this.last_name].join(' ');
  }
};

module.exports = telegramUserSchema;
