const config = require('./config.json');
const AudioServer = require('./lib/icecast');
const MemoryDriver = require('./memory');
const _ = require('underscore');

// Console log helper
[
[ 'warn',  '\x1b[35m' ],
[ 'error', '\x1b[31m' ],
[ 'info',   '\x1b[2m' ],
[ 'debug',   '\x1b[30m' ],
// Custom methods
[ 'io',   '\x1b[35m' ],
[ 'user',   '\x1b[35m' ],
[ 'ai',   '\x1b[35m' ],
].forEach(function(pair) {
  var method = pair[0], reset = '\x1b[0m', color = '\x1b[36m' + pair[1];
  var func = console[method] || console.log;
  console[method] = function() {
    func.apply(console, [ color + '[' + method.toUpperCase() + ']' ].concat(_.toArray(arguments)).concat(reset) );
  };
});

// Initialize
global.__basedir = __dirname;
global.Icecast = new AudioServer(config.icecast);
global.Memory = new MemoryDriver(config);
global.Bot = require('./bot');

if (config.telegram.webhook != null) {
	// TODO
	throw new Error('Webhook not yet supported.');
} else {
	Bot.startPolling();
}
