/*
* @Author: Jei
* @Date:   2017-12-14 15:55:49
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-14 16:53:00
*/

function __formatSourceData(source = {}) {
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

class GetSources extends require('./command') {

  routine() {
    return Icecast.getSources()
    .then((res) => {
      const length = res.length;
      const response = {
        msg: `There ${length > 1 ? "are" : "is"} ${length} source${length > 1 ? "s" : ""} attached:\n`,
        opts: {
          parse_mode: 'Markdown',
          disable_web_page_preview: true,

        },
      };

      if (res.length == 0) {
        response.msg = 'There are no sources attached to the server 🤔';
      } else {
        response.msg += res.map(__formatSourceData).join('\n');
      }

      return response;
    });
  }

  getLevel() {
    return 2;
  }

  getDescription() {
    return 'List the sources currently attached to the Icecast server.';
  }

}

module.exports = GetSources;

