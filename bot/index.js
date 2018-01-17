/*
* @Author: Jei
* @Date:   2017-12-20 17:37:10
* @Last Modified by:   Jei
* @Last Modified time: 2018-01-17 19:35:47
*/

const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const { token } = require('../config').telegram;
const user = require('./middlewares/user');
const logger = require('./middlewares/logger');
const { listCommands, listScenes } = require('./helpers');

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

////////////
// Scenes //
////////////

const stage = new Stage(listScenes());

/////////////////
// Middlewares //
/////////////////

bot.use(Telegraf.session());
bot.use(user);
bot.use(logger);
bot.use(stage.middleware());

//////////////
// Commands //
//////////////

listCommands().forEach(command => {
  bot.command(command.name, ctx => command.instance.run(ctx));
});

bot.hears(/\/\w+/, async (ctx) => {
  await ctx.reply('If you are confused type /help');
});

bot.catch((e) => {
  console.error(e);
  // TODO send a message to the owners
});

module.exports = bot;