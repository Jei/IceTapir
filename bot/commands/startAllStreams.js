/*
* @Author: Jei
* @Date:   2017-12-21 17:21:24
* @Last Modified by:   andrea.jonus
* @Last Modified time: 2017-12-22 17:31:45
*/

// FIXME
class StartAllStreams extends require('../command') {

  async routine(ctx) {
    Liquidsoap.startup();

    return ctx.reply('Streams started.');
  }

  getLevel() {
    return 2;
  }

  getDescription() {
    return 'Start all the Liquidsoap streams.';
  }

}

module.exports = StartAllStreams;
