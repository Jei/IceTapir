/*
* @Author: andrea.jonus
* @Date:   2017-12-22 11:52:06
* @Last Modified by:   andrea.jonus
* @Last Modified time: 2017-12-22 17:47:31
*/

const shell = require('shelljs');
const scripts = require('./scripts');

class Liquidsoap {
  constructor(cfg) {
    // TODO set streams configuration
    this.icecast = cfg.icecast;
    this.streams = cfg.liquidsoap.streams || [];
  }

  // FIXME not static
  static startStream(stream, server) {
    if (stream.process != null) {
      console.warn('Stream', stream, 'already started.');
      return;
    }

    const scriptTemplate = scripts[stream.script];
    const { playlistPath, logPath, mount } = stream;
    const { host, port, sourcesPassword } = server;

    console.log(scriptTemplate({
      mount,
      playlistPath,
      logPath,
      host,
      port,
      sourcesPassword
    }));

    stream.process = shell.exec('liquidsoap "' + scriptTemplate({
      mount,
      playlistPath,
      logPath,
      host,
      port,
      sourcesPassword
    }) + '"', (code, stdout, stderr) => {
      if (stderr != null) {
        console.error('Stream error:', stderr);
      }
      console.log('Stream stopped with code', code);
      stream.process = null;
    });
  }

  // FIXME not static
  static stopStream(stream) {
    if (stream.process == null) {
      console.warn('Stream', stream, 'not started.');
      return;
    }

    stream.process.kill();
  }

  startup() {
    this.streams.forEach(stream => { Liquidsoap.startStream(stream, this.icecast) });
  }

  shutdown() {
    this.streams.forEach(Liquidsoap.stopStream);
  }

}

module.exports = Liquidsoap;
