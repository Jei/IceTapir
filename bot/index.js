/*
* @Author: Jei
* @Date:   2017-12-20 17:37:10
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 16:24:39
*/

const Telegraf = require('telegraf');
const { token } = require('../config').telegram;
const user = require('./middlewares/user');
const logger = require('./middlewares/logger');
const flow = require('./middlewares/flow');

const bot = new Telegraf(token);

setImmediate(async () => {
  try {
    const data = await bot.telegram.getMe();
    bot.options.username = data.username;
  } catch (e) {
    console.error(e.message);
  }
});

bot.context.user = null;

bot.use(Telegraf.session());
bot.use(user);
bot.use(logger);
bot.use(flow);

bot.hears(/\/\w+/, async (ctx) => {
  await ctx.reply('If you are confused type /help');
});

bot.catch((e) => {
  console.error(e);
  // TODO send a message to the owners
});

module.exports = bot;