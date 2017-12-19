/*
* @Author: Jei
* @Date:   2017-12-18 12:33:31
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-19 11:18:55
*/

const _ = require('underscore');

// TODO move in a separate handler
Telegram.on('message', async (msg) => {
  const { id } = msg.from;
  let tUser;
  let user;

  try {
    tUser = await Memory.models.TelegramUser.findOne({ id: id }).exec();
  } catch(err) {
    // TODO standard response message
    console.error(err);
    return;
  }

  try {
    user = await Memory.models.User.findOne({ telegram: tUser._id }).exec();
  } catch(err) {
    // TODO standard response message
    console.error(err);
    return;
  }

  if (msg.entities) {
    _.find(msg.entities, async (entity) => {
      if (entity.type != 'bot_command') return;

      let result;

      try {
        const commandName = msg.text.substr(entity.offset+1, entity.length-1);
        const command = new (require(__basedir + '/commands/' + commandName))({ user });

        result = await command.run(msg, msg.text.substr(entity.offset+entity.length+1));
        result = result || {};
        await Telegram.output(tUser.id, result.msg, result.opts);
      } catch(err) {
        // TODO standard response message
        console.error(err);
      }
    });
  }
});
