const TAG = 'IO.Telegram';
const TelegramBot = require('tgfancy');
const _ = require('underscore');

class Telegram extends require('./iodriver') {
  constructor(cfg) {
    super();
    this.bot = new TelegramBot(cfg.token, _.extend(cfg.options, {
      tgfancy: {
        textPaging: true,
        chatIdResolution: true,
      },
    }));

    // TODO add webhook shutdown
    if (cfg.webhook) {
      var listenUrl = cfg.webhook.url + cfg.token;
      this.bot.setWebHook(listenUrl, cfg.webhook.options);
      this.bot.getWebHookInfo().then((e) => {
        console.info(TAG, 'started', e); 
      });
    }

    this.bot.on('message', (msg) => {
      this.emit('message', msg);
    });
  }

  notifyUsersWithLevel(level = 999, msg) {
    const { User, TelegramUser } = Memory.models;
    let admins;

    return User.find({ level: { $gt: level-1 } }).exec()
    .then(async admins => {
      if (admins.length < 1) return Promise.resolve();

      return Promise.all(admins.map(user => {
        // Catch any rejection from the single promise. We don't need to stop everything.
        return TelegramUser.findOne({ _id: user.telegram })
        .then(tUser => {
          if (!tUser) return Promise.resolve();

          return this.output(tUser.id, msg);
        })
        .catch(console.error);
      }));
    });
  }

  output(chatId, msg = {}, opts = {}) {
    console.io(TAG, chatId, msg);
    if (_.isString(msg)) msg = { text: msg };

    if (msg.text) {
      this.bot.sendChatAction(chatId, 'typing');
      return this.bot.sendMessage(chatId, msg.text, opts);
    }

    if (msg.photo) {
      this.bot.sendChatAction(chatId, 'upload_photo');
      return this.bot.sendPhoto(chatId, msg.photo, opts);
    }

    console.warn('No supported type found for the message: ' + JSON.stringify(msg));
    return Promise.resolve();
  }
}

module.exports = Telegram;
