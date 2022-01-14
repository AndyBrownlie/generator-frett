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
          name: "featureName",
          message: "Enter feature name",
          default: this.options.name
      },
      {
        type: "input",
        name: "modelName",
        message: "Enter model name",
        default: this.options.name
    }
    ]);

    this.props = extend(this.props, input);
  }

  default() {
    console.log(this.props);
    
    this.composeWith(require.resolve('../model'), {
        modelName: this.props.modelName
    });
  
  }

};