/*
* @Author: Jei
* @Date:   2017-12-21 14:21:55
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 16:17:26
*/

/*
* @Author: Jei
* @Date:   2017-12-13 09:55:33
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-19 10:23:41
*/

const fs = require('fs');
const _ = require('underscore');

class Help extends require('../command') {
  routine(ctx) {
    _.defaults(ctx, { user: {} });
    let parts = ['⚙ *Commands:*\n'];

    require('../helpers').listCommands().forEach(command => {
      if (!command.instance.canRun(ctx.user.level)) return;

      parts.push(`• /${command.name} - ${command.instance.getDescription()}`);
    });

    return ctx.replyWithMarkdown(parts.length > 1 ? parts.join('\n') : "You have no commands available (yet) 🙃");
  }

  getLevel() {
    return 0;
  }

  getDescription() {
    return 'View a list of available commands.';
  }

}

module.exports = Help;

