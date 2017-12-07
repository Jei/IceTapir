/*
* @Author: Jei
* @Date:   2017-12-07 18:11:46
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-07 18:12:42
*/

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/icetapir');

module.exports = mongoose;