/*
* @Author: Jei
* @Date:   2017-12-21 17:21:24
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 17:26:48
*/

const __formatSourceData = (source = {}) => {
  // TODO use source.listenUrl for "URL"
  // TODO find a way to suppress command highligting for mounts
  return `
  🔩 Mount: ${source.mount}
  🎧 Listeners: ${source.listeners}
  🔝 Peak Listeners: ${source.listenerPeak}
  🎼 Genre: ${source.genre}
  🔗 URL: ${source.serverUrl + source.mount}
  `;
}

class GetSources extends require('../command') {

  async routine(ctx) {
    const sources = await Icecast.getSources();
    const length = sources.length;

    if (length == 0) {
      return ctx.reply('There are no sources attached to the server 🤔');
    }

    let response = `There ${length > 1 ? "are" : "is"} ${length} source${length > 1 ? "s" : ""} attached:\n`;
    response += sources.map(__formatSourceData).join('\n');

    return ctx.replyWithMarkdown(response);
  }

  getLevel() {
    return 2;
  }

  getDescription() {
    return 'List the sources currently attached to the Icecast server.';
  }

}

module.exports = GetSources;
