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
global.__basedir = __dirname;
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

// TODO move in a separate handler
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

  // TODO standard response message
  if (tUser.user == null) return;

  // TODO check user's group
  // TODO execute only the first command?
  if (msg.entities) {
    msg.entities.forEach(async (entity) => {
      if (entity.type != 'bot_command') return;

      let result;

      try {
        const commandName = msg.text.substr(entity.offset+1, entity.length-1);
        const command = new (require('./commands/' + commandName))();

        // TODO standard response message
        if (!command.canRun(tUser.user.group)) {
          console.warn(`Telegram user "${tUser.username}" (${tUser.id}) called the command "${commandName}" but is not authorized.`);
          return;
        }

        result = await command.run();
        await Telegram.output(tUser.id, result);
      } catch(err) {
        console.error(err);
      }
    });
  }
});
