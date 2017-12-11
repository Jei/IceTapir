/*
* @Author: Jei
* @Date:   2017-12-11 16:08:24
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-11 16:32:21
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var telegramUserSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  // Taken from https://core.telegram.org/bots/api#user
  id: Number,
  is_bot: Boolean,
  first_name: String,
  last_name: String,
  username: String,
  language_code: String,
});

module.exports = telegramUserSchema;
