/*
* @Author: Jei
* @Date:   2017-12-07 18:11:46
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 17:14:38
*/

const mongoose = require('mongoose');
const _ = require('underscore');

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
    (cfg.users || []).forEach(async (item) => {
      const { telegram_id, ...userAttrs } = item;

      try {
        const user = await this.updateUser(userAttrs, { upsert: true });

        if (telegram_id == null) {
          console.warn('No telegram_id set for user', user.username);
          return;
        }

        const tUser = await this.updateTelegramUser({ id: telegram_id }, { upsert: true });
        user.telegram = tUser._id;

        await user.save();
        console.info('Updated user', user, 'from config file.');
      } catch(err) {
        console.error(err);
        return;
      }
    });
  }

  updateUser(attrs = {}, options = {}) {
    const { username, ...restAttrs } = attrs;
    _.defaults(options, {
      upsert: false,
      setDefaultsOnInsert: true,
      new: true,
    });

    if (username == null) return Promise.reject('Missing parameter "username"');

    return this.models.User.findOneAndUpdate({ username }, restAttrs, options).exec();
  }

  updateTelegramUser(attrs = {}, options = {}) {
    const { id, ...restAttrs } = attrs;
    _.defaults(options, {
      upsert: false,
      setDefaultsOnInsert: true,
      new: true,
    });

    if (id == null) return Promise.reject('Missing parameter "id"');

    return this.models.TelegramUser.findByIdAndUpdate(id, restAttrs, options).exec();
  }

  findUserById(id) {
    return this.models.User.findById(id).exec();
  }

  findUsersWithLevel(level = 0) {
    return this.models.User.find({ level: { $gt: level-1 } }).exec();
  }

  findUserByTelegramId(id) {
    return this.models.User.findOne({ telegram: id }).exec();
  }

  findTelegramUserById(id) {
    return this.models.TelegramUser.findById(id).exec();
  }

}

module.exports = Memory;
