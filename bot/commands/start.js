/*
* @Author: Jei
* @Date:   2017-12-19 10:21:06
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 17:17:41
*/

const { notifyUsersWithLevel } = require('../helpers');

class Start extends require('../command') {
  async routine(ctx) {
    const tUser = await Memory.updateTelegramUser(ctx.from, { upsert: true });

    // Notify admins
    // TODO better notification
    return notifyUsersWithLevel(2, `A new user has started the bot: ${tUser.getPrettyName()} (${tUser.id})`);
  }

  getLevel() {
    return 0;
  }

  getDescription() {
    return 'Start the bot.';
  }

}

module.exports = Start;
