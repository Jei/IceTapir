/*
* @Author: Jei
* @Date:   2017-12-21 11:25:01
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 11:25:08
*/

const TelegrafLogger = require('telegraf-logger');


const logger = new TelegrafLogger({
  format: '%updateType => *%sceneId* @%username %firstName %lastName (%fromId): <%updateSubType> %content',
});

module.exports = logger.middleware();