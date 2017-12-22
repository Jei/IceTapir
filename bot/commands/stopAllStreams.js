/*
* @Author: Jei
* @Date:   2017-12-21 17:21:24
* @Last Modified by:   andrea.jonus
* @Last Modified time: 2017-12-22 17:32:28
*/

// FIXME
class StartAllStreams extends require('../command') {

  async routine(ctx) {
    Liquidsoap.shutdown();

    return ctx.reply('Streams stopped.');
  }

  getLevel() {
    return 2;
  }

  getDescription() {
    return 'Stop all the Liquidsoap streams.';
  }

}

module.exports = StartAllStreams;
