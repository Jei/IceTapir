/*
* @Author: Jei
* @Date:   2017-12-11 12:20:29
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-11 16:32:23
*/

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  group: {
    type: String,
    enum: ['admin','listener'],
    default: 'listener',
  }
});

module.exports = userSchema;
