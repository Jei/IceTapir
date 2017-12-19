/*
* @Author: Jei
* @Date:   2017-12-13 09:55:33
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-19 10:23:41
*/

const fs = require('fs');

class Help extends require('./command') {
  constructor(cfg = {}) {
    super(cfg);

    // TODO better command symbol handling
    this.commandSymbol = cfg.commandSymbol || '/';
  }

  __prettifyDescription(name, description) {
    return '• ' + this.commandSymbol + name + ' - ' + description;
  }

  routine() {
    return new Promise((resolve, reject) => {
      fs.readdir(__basedir + '/commands/', (err, content) => {
        if (err) return reject(err);

        let parts = ['⚙ *Commands:*\n'];

        try {
          content.forEach(file => {
            if (file == 'command.js') return;
            const commandName = file.replace('.js','');
            const command = new (require('./' + commandName))();

            if (!command.canRun(this.user.level)) return;

            parts.push(this.__prettifyDescription(commandName, command.getDescription()));
          });
        } catch(err) {
          return reject(err);
        }

        resolve({
          msg: parts.length > 1 ? parts.join('\n') : "You have no commands available (yet) 🙃",
          opts: {
            parse_mode: 'Markdown',
          }
        });
      });
    });
  }

  getLevel() {
    return 0;
  }

  getDescription() {
    return 'View a list of available commands.';
  }

}

module.exports = Help;
