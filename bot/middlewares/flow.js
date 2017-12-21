/*
* @Author: Jei
* @Date:   2017-12-21 12:10:20
* @Last Modified by:   Jei
* @Last Modified time: 2017-12-21 16:23:59
*/

const TelegrafFlow = require('telegraf-flow');
const { listCommands, listScenes } = require('../helpers');

const flow = new TelegrafFlow([],{});

listCommands().forEach(command => {
  flow.command(command.name, ctx => command.instance.run(ctx));
});
listScenes().forEach(flow.register);

module.exports = flow;