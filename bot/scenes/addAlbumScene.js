/*
* @Author: Jei
* @Date:   2018-01-17 18:51:24
* @Last Modified by:   Jei
* @Last Modified time: 2018-01-17 19:37:00
*/

const Scene = require('telegraf/scenes/base');
const { leave } = require('telegraf/stage');

const handler = new Scene('add_album');

handler.enter(ctx => ctx.reply('Test'));
handler.leave(ctx => ctx.reply('Canceled'));
// Note: the order of the following operations is important!
handler.command('cancel', leave());
handler.on('message', ctx => ctx.reply('Message'));

module.exports = handler;