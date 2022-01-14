var Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;
var OptionOrPrompt = require('yeoman-option-or-prompt');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    this.optionOrPrompt = OptionOrPrompt;
  }

  async prompting() {
  
    const input = await this.optionOrPrompt([           
      {
          type: "input",
          name: "modelName",
          message: "Enter model name",
          default: this.appname
      }
    ]);

    this.props = extend(this.props, input);
  }

  writing() {
    this.log('props.modelName:', this.props.modelName);
    this.log('options.modelName:', this.options.modelName);
  }

};