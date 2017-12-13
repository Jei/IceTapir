/*
* @Author: Jei
* @Date:   2017-12-13 09:55:33
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-13 16:59:32
*/

const fs = require('fs');

class Help extends require('./command') {
  constructor(cfg) {
    super();
    cfg = cfg || {};

    // TODO better command symbol handling
    this.commandSymbol = cfg.commandSymbol || '/';
    // TODO 
    this.user = cfg.user || {};
  }

  __prettifyDescription(name, description) {
    return '• ' + this.commandSymbol + name + ' - ' + description;
  }

  routine() {
    return new Promise((resolve, reject) => {
      fs.readdir(__basedir + '/commands/', (err, content) => {
        if (err) return reject(err);

        let descriptions = [];

        try {
          content.forEach(file => {
            if (file == 'command.js') return;
            const commandName = file.replace('.js','');
            const command = new (require('./' + commandName))();

            if (!command.canRun(this.user.group || 'outsiders')) return;

            descriptions.push(this.__prettifyDescription(commandName, command.getDescription()));
          });
        } catch(err) {
          return reject(err);
        }

        resolve(descriptions.join('\n'));
      });
    });
  }

  getGroups() {
    return ['admins','listeners','outsiders'];
  }

  getDescription() {
    return 'View a list of available commands.';
  }

}

module.exports = Help;
