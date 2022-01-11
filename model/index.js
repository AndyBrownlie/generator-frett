var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Name provided for model'
    });
  }

  prompting() {
    this.log('prompting - model', this.options.name);
  }

  writing() {
    this.log('writing - model', this.options.name);
  }

};