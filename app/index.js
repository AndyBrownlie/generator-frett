var Generator = require('yeoman-generator');
const _ = require('lodash');

const extend = _.merge;

module.exports = class extends Generator {
    
  initializing() {
    this.props = {};
  }

  prompting() {

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });

  }

  default() {
    this.composeWith(require.resolve('../model'), {
        name: this.props.name
    });
  }
};
