/*
* @Author: Jei
* @Date:   2017-12-11 12:20:29
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 16:21:31
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  telegram: {
    type: Number,
    unique: true,
  },
  level: {
    type: Number,
    default: 0,
  }
});

module.exports = userSchema;
