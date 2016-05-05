'use strict';
const BasicCommands = require('akp48-plugin-basic-commands');

class GoogleCommands extends BasicCommands {
  constructor(AKP48, config) {
    super(AKP48);
    this._data = require('./plugin.json');
    //manually override pluginName, since we're extending another plugin.
    this._pluginName = 'GoogleCommands';

    this._config = config;
    if(!this._config) {
      global.logger.info(`${this._pluginName}: No config specified. Generating defaults.`);
      this._config = {
        deleteMe: 'DELETE THIS KEY AND ADD AN API KEY FOR ADDITIONAL FUNCTIONALITY',
        apiKey: 'Use this documentation to obtain a Server key: https://support.google.com/cloud/answer/6158862?hl=en&ref_topic=6262490'
      };

      this._AKP48.saveConfig(this._config, 'google-commands');
    }

    //this means we don't have an API key, probably.
    if(this._config.deleteMe) {
      this.googleAPI = new (require('./google.js'))();
    } else {
      this.googleAPI = new (require('./google.js'))(this._config.apiKey);
    }

    var self = this;
    this.commands = {};

    require('./commands').then(function(res){
      self.commands = res;
    }, function(err){
      console.error(err);
    });
  }

  handleCommand(message, context, resolve) {
    global.logger.silly(`${this._pluginName}: Received command.`);

    //inject Google API into the context.
    context.GoogleAPI = this.googleAPI;

    //run the handleCommand logic from BasicCommands, which should use our defined commands instead.
    global.logger.silly(`${this._pluginName}: Attempting to handle command using BasicCommands logic.`);
    super.handleCommand(message, context, resolve);
    delete context.GoogleAPI; //don't want other plugins to have this in the context.
  }
}

module.exports = GoogleCommands;
