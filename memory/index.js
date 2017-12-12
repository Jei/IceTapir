/*
* @Author: Jei
* @Date:   2017-12-07 18:11:46
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-12 13:13:44
*/

const mongoose = require('mongoose');

class Memory {
  constructor(cfg) {
    const database = mongoose.connect('mongodb://localhost/icetapir', {
      useMongoClient: true,
    });

    // mpromise is deprecated. See http://mongoosejs.com/docs/promises.html
    mongoose.Promise = global.Promise;

    this.models = {
      User: database.model('User', require('./user')),
      TelegramUser: database.model('TelegramUser', require('./telegramUser')),
    };

    // Check and add users from the config file if needed
    (cfg.users || []).forEach((item) => {
      const { username, group, telegram_id } = item;
      console.info('Upserting user', item);

      this.models.User.findOneAndUpdate({ username: username }, { group: group }, { upsert: true, setDefaultsOnInsert: true, new: true })
      .then((user) => {
        console.info('Updated user', user);
        if (telegram_id == null) {
          console.warn('No telegram_id set for user', user.username);
          return null;
        }

        // Create or update the Telegram info for this user
        return this.models.TelegramUser.findOneAndUpdate({ id: telegram_id }, { user: user._id }, { upsert: true, setDefaultsOnInsert: true, new: true });
      })
      .then((tUser) => {
        console.info('Updated Telegram user', tUser);
        if (tUser) {
          return this.models.User.update({ username: username }, { telegram: tUser._id });
        } else {
          return null;
        }
      })
      .catch((err) => console.error(err));
    });
  }
}

module.exports = Memory;
