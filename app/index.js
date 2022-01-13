var Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;
var OptionOrPrompt = require('yeoman-option-or-prompt');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.optionOrPrompt = OptionOrPrompt;
  }

  async prompting() {
  
    const input = await this.optionOrPrompt([           
      {
        type: "input",
        name: "name",
        message: "Enter name",
        default: this.appname
      },
      {
          type: "input",
          name: "featureName",
          message: "Enter feature name",
      }
    ]);

    this.props = extend(this.props, input);
  }

  default() {
    console.log(this.props);
    
    this.composeWith(require.resolve('../model'), {
        featureName: this.props.featureName
    });
  
  }
}