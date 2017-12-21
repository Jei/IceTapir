/*
* @Author: Jei
* @Date:   2017-12-20 17:46:36
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 11:38:24
*/

module.exports = async (ctx, next) => {
  if (ctx.inlineQuery) {
    await next();
    return;
  } else if (ctx.callbackQuery) {
    switch (ctx.callbackQuery.data) {
      case 'CANCEL':
      case 'REPEAT':
        await next();
        return;
      default: // pass
    }
  }

  ctx.telegramUser = await Memory.findTelegramUserById(ctx.from.id);
  ctx.user = await Memory.findUserByTelegramId(ctx.telegramUser._id);
  await next();
};
