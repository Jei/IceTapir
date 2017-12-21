/*
* @Author: Jei
* @Date:   2017-12-21 12:18:55
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 17:18:27
*/

const fs = require('fs');
const Command = require('./command');

const capitalize = str => str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';

// FIXME
exports.notifyUsersWithLevel = async function(level = 999, msg) {
  const { User, TelegramUser } = Memory.models;

  const users = await Memory.findUsersWithLevel(level);

  if (users.length < 1) return Promise.resolve();

  return Promise.all(users.map(user => {
    // Catch any rejection from the single promise. We don't need to stop everything.
    return Memory.findTelegramUserById(user.telegram)
    .then(tUser => {
      if (!tUser) return Promise.resolve();

      return Bot.telegram.sendMessage(tUser._id, msg);
    })
    .catch(console.error);
  }));
}

exports.listCommands = () => {
  const items = [];

  fs.readdirSync(__basedir + '/bot/commands').forEach(file => {
    const name = file.replace('.js','');
    let Clazz;
    try {
      Clazz = require(__basedir + '/bot/commands/' + name);
    } catch(err) {
      console.warn(`Could not require ${file}:`, err);
      return;
    }

    if (!(Clazz.prototype instanceof Command)) {
      console.warn(`Class ${file} does not extend the "Command" class.`);
      return;
    }

    items.push({
      name,
      instance: new Clazz(),
    });
  });

  return items;
}

exports.listScenes = () => {
  const items = [];

  fs.readdirSync(__basedir + '/bot/scenes').forEach(file => {
    const scene = file.replace('.js','');
    let definition;
    try {
      definition = require(__basedir + '/bot/scenes/' + scene);
    } catch(err) {
      console.warn(`Could not require ${file}:`, err);
      return;
    }

    items.push(definition);
  });

  return items;
};
