/*
* @Author: Jei
* @Date:   2018-01-17 19:12:50
* @Last Modified by:   Jei
* @Last Modified time: 2018-01-17 19:15:47
*/

const _ = require('underscore');

class AddAlbum extends require('../command') {
  routine(ctx) {
    _.defaults(ctx, { user: {} });

    return ctx.scene.enter('add_album');
  }

  getLevel() {
    return 2;
  }

  getDescription() {
    return 'Add an album to the playlist.';
  }

}

module.exports = AddAlbum;
