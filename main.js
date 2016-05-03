'use strict';
const BasicCommands = require('akp48-plugin-basic-commands');

class GoogleCommands extends BasicCommands {
  constructor(AKP48) {
    super(AKP48);
    this._data = require('./plugin.json');
    //manually override pluginName, since we're extending another plugin.
    this._pluginName = 'GoogleCommands';
    var self = this;
    this.commands = {};
    require('./commands').then(function(res){
      self.commands = res;
    }, function(err){
      console.error(err);
    });
  }

  handleCommand(message, context, resolve) {
    GLOBAL.logger.silly(`${this._pluginName}: Received command.`);

    //run the handleCommand logic from BasicCommands, which should use our defined commands instead.
    GLOBAL.logger.silly(`${this._pluginName}: Attempting to handle command using BasicCommands logic.`);
    super.handleCommand(message, context, resolve);
  }
}

module.exports = GoogleCommands;
