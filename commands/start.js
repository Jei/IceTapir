/*
* @Author: Jei
* @Date:   2017-12-19 10:21:06
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-19 11:20:44
*/

class Start extends require('./command') {
  routine(msg) {
    return new Promise(async (resolve, reject) => {
      try {
        const tUser = await Memory.updateTelegramUser(msg.from, { upsert: true });
        console.info('Telegram user', tUser, 'started the bot.');

        // Notify admins
        // TODO better notification
        await Telegram.notifyUsersWithLevel(2, `A new user has started the bot: ${tUser.getPrettyName()} (${tUser.id})`);
      } catch(err) {
        console.error(err);
        return reject(err);
      }

      resolve();
    });
  }

  getLevel() {
    return 0;
  }

  getDescription() {
    return 'Start the bot.';
  }

}

module.exports = Start;
