const config = require('./config.json');
const IODriver = require('./io/telegram');
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
global.Telegram = new IODriver(config.telegram);
global.Icecast = new AudioServer(config.icecast);
global.Memory = new MemoryDriver(config);

Telegram.on('start', async (msg) => {
  try {
    await Memory.models.TelegramUser
    .findOneAndUpdate(
      { id: id },
      { ...msg.from },
      { upsert: true, setDefaultsOnInsert: true, new: true }
      )
    .exec();
  } catch(err) {
    console.error(err);
  }
});

Telegram.on('message', async (msg) => {
  const { id } = msg.from;
  let tUser;

  try {
    tUser = await Memory.models.TelegramUser
      .findOneAndUpdate(
        { id: id },
        { ...msg.from },
        { upsert: true, setDefaultsOnInsert: true, new: true }
      )
      .populate('user')
      .exec();
  } catch(err) {
    console.error(err);
  }

  try {
    Telegram.output(tUser.id, (tUser.isAdmin() ? 'You are an admin, ' : 'You are NOT an admin, ') + tUser.getPrettyName());
  } catch(err) {
    console.error(err);
  }
});
